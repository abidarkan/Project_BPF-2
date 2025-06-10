// src/pages/MapPage.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  // Pusat peta diatur ke tengah Provinsi Riau dengan zoom lebih jauh
  const riauCenter = [0.5, 101.7]; 
  const riauZoom = 8;

  // Daftar penanda untuk kota-kota di Riau
  const cityMarkers = [
    { position: [0.5071, 101.4478], name: 'Pekanbaru' },
    { position: [1.6706, 101.4451], name: 'Dumai' },
    { position: [1.4167, 101.3], name: 'Duri' },
    { position: [-0.3333, 102.45], name: 'Rengat' },
    { position: [0.85, 101.5667], name: 'Siak Sri Indrapura' },
    { position: [0.332, 101.025], name: 'Bangkinang' },
  ];

  return (
    <div className="h-[85vh] w-full rounded-2xl overflow-hidden animate-fade-in-up shadow-2xl">
      <MapContainer center={riauCenter} zoom={riauZoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Menampilkan semua penanda kota */}
        {cityMarkers.map(city => (
          <Marker key={city.name} position={city.position}>
            <Popup>
              <b>{city.name}</b>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default MapPage;