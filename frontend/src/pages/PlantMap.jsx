import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Divider } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PlantMap = ({ plants, selectedPlantId, onPlantSelect }) => {
    const mapRef = useRef(null);
  
    useEffect(() => {
      if (mapRef.current && plants?.length > 0) {
        const bounds = L.latLngBounds(plants.map(plant => 
          [plant.latitude, plant.longitude]
        ));
        
        if (selectedPlantId) {
          const selectedPlant = plants.find(p => p.id === selectedPlantId);
          mapRef.current.flyTo([selectedPlant.latitude, selectedPlant.longitude], 15);
        } else {
          mapRef.current.flyToBounds(bounds, { padding: [50, 50] });
        }
      }
    }, [plants, selectedPlantId]);
  
    return (
      <>
      <button 
          onClick={() => window.history.back()} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Back
      </button>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ 
          height: '80vh', 
          width: '100%', 
          borderRadius: '16px',
          boxShadow: '0px 3px 5px rgba(0,0,0,0.2)'
        }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {plants?.map(plant => (
          <Marker
            key={plant.id}
            position={[Number(plant.latitude), Number(plant.longitude)]}
            eventHandlers={{
              click: () => {
                onPlantSelect(plant.id);
              },
            }}
          >
            <Popup>
              <div style={{ 
                background: selectedPlantId === plant.id ? '#e3f2fd' : 'white',
                padding: '8px',
                borderRadius: '4px'
              }}>
                <strong style={{ color: '#2e7d32' }}>{plant.name}</strong>
                <p>{plant.scientific_name}</p>
                <Divider style={{ margin: '8px 0' }} />
                <p style={{ fontStyle: 'italic' }}>{plant.description}</p>
                {plant.medicinal_use && (
                  <p><strong>Medicinal Use:</strong> {plant.medicinal_use}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      </>
    );
  };

export default PlantMap;