
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ pickupCoords, destinationCoords }) => {
    const map = useMap();
    useEffect(() => {
      if (!pickupCoords || !destinationCoords) return;
  
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(pickupCoords), L.latLng(destinationCoords)],
        routeWhileDragging: true,
      }).addTo(map);
  
      return () => map.removeControl(routingControl);
    }, [pickupCoords, destinationCoords, map]);
  
    return null;
  };

  export default RoutingMachine;
  