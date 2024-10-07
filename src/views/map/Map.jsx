import React from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  return (
    <div style={{ width: '100%', height: '450px', display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <MapContainer
                center={[7.8731, 80.7718]} // Sri Lanka coordinates
                zoom={8}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </MapContainer>
            </div>
  )
}
