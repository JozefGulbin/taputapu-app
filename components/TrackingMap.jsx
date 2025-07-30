'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function TrackingMap({ initialLatitude, initialLongitude, mode }) {
  const [position, setPosition] = useState([initialLatitude, initialLongitude]);
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (mode !== 'follow') {
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (newPosition) => {
        const newLat = newPosition.coords.latitude;
        const newLng = newPosition.coords.longitude;
        setPosition([newLat, newLng]);
        if (mapRef.current) {
          mapRef.current.panTo([newLat, newLng]);
        }
      },
      (error) => {
        console.error("Error watching position:", error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [mode]);

  return (
    <MapContainer 
        center={position} 
        zoom={16} 
        style={{ height: '100vh', width: '100%' }}
        ref={mapRef}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          {mode === 'follow' ? 'Seku tave...' : 'Čia esi tu!'}
        </Popup>
      </Marker>
    </MapContainer>
  );
}