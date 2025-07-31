// components/PinMap.jsx

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

function PinAndUpload() {
    const [position, setPosition] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !position) {
            setMessage('Prašome pasirinkti failą ir pažymėti vietą žemėlapyje.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('lat', position.lat);
        formData.append('lng', position.lng);
        
        setMessage('Įkeliama...');

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setMessage(`Įkėlimas sėkmingas! Failo vieta: ${data.filePath}`);
            e.target.reset();
        } catch (error) {
            setMessage(`Klaida: ${error.message}`);
        }
    };

    return !position ? null : (
        <Marker position={position}>
            <Popup>
                <div>
                    <p>Koordinatės: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
                    <form onSubmit={handleSubmit}>
                        <input type="file" accept="image/*" onChange={handleFileChange} required />
                        <button type="submit">Įkelti nuotrauką</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </Popup>
        </Marker>
    );
}

// Ensure this line exists and is correct
export default function PinMap() {
    return (
        <MapContainer
            center={[55.5, 24.0]}
            zoom={7}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PinAndUpload />
        </MapContainer>
    );
}