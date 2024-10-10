import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

export default function Map({ pickup, destination }) {
  return (
    <div style={{ width: '100%', height: '450px', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <MapContainer center={pickup} zoom={12} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={pickup}>
          <Popup>Pickup Location</Popup>
        </Marker>

        <Marker position={destination}>
          <Popup>Destination Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
