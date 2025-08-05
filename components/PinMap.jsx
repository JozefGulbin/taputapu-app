// This is the new, V2-compatible code for components/PinMap.js

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) { return `${hours}h ${minutes}m`; }
  return `${minutes}m`;
}

class PinMap extends React.Component {
    // We use a class component for better compatibility with v2
    state = {
        startPoint: null,
        locationStatus: "Finding your location...",
        endPoint: null,
        distance: '',
        travelTime: '',
        profile: 'foot-hiking',
        activeRoute: null,
        selectedFile: null,
        uploadStatus: ''
    };

    mapRef = React.createRef();
    routeLayerRef = null;
    destinationMarkerRef = React.createRef();
    fileInputRef = React.createRef();

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ startPoint: { lat: position.coords.latitude, lng: position.coords.longitude }, locationStatus: '' });
            },
            (error) => {
                console.error("Geolocation error:", error);
                this.setState({ locationStatus: `Could not get location. Defaulting to Vilnius.`, startPoint: { lat: 54.6872, lng: 25.2797 } });
            }
        );
    }

    handleMapClick = (e) => {
        const map = this.mapRef.current.leafletElement;
        if (this.routeLayerRef) {
            map.removeLayer(this.routeLayerRef);
        }
        this.setState({
            endPoint: e.latlng,
            distance: '',
            travelTime: '',
            activeRoute: null,
            selectedFile: null,
            uploadStatus: ''
        });
        setTimeout(() => {
            if (this.destinationMarkerRef.current) {
                this.destinationMarkerRef.current.leafletElement.openPopup();
            }
        }, 1);
    }
    
    createRoute = () => {
        const { startPoint, endPoint, profile } = this.state;
        if (!startPoint || !endPoint) return;

        const map = this.mapRef.current.leafletElement;
        if (this.routeLayerRef) { map.removeLayer(this.routeLayerRef); }

        this.setState({ distance: 'Calculating...', travelTime: '' });

        const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhlYzVmNDI1Yzc2MTQ3MDE5YzY3NmQ3MmRiOTFmYTVlIiwiaCI6Im11cm11cjY0In0=';
        const url = `/api/ors?profile=${profile}`;
        const body = { coordinates: [[startPoint.lng, startPoint.lat], [endPoint.lng, endPoint.lat]] };

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            this.routeLayerRef = L.geoJSON(data).addTo(map);
            const summary = data.features[0].properties.summary;
            const kms = (summary.distance / 1000).toFixed(2);
            this.setState({ distance: `${kms} km`, travelTime: formatDuration(summary.duration) });
        })
        .catch(err => {
            console.error('Routing Error:', err);
            this.setState({ distance: "Route Error", travelTime: '' });
        });
    }
    
    handleProfileChange = (newProfile) => {
        this.setState({ profile: newProfile }, () => {
            // Re-calculate route if one was already active
            if (this.state.endPoint) {
                this.createRoute();
            }
        });
    }

    handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ selectedFile: file, uploadStatus: `Selected: ${file.name}` });
        }
    };
    
    handleImageUpload = async () => {
        const { selectedFile } = this.state;
        if (!selectedFile) {
            this.setState({ uploadStatus: 'Please select a file first.' });
            return;
        }
        this.setState({ uploadStatus: 'Uploading...' });

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload', { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Upload failed.');
            const result = await response.json();
            this.setState({ uploadStatus: `Success! Image URL: ${result.url}` });
        } catch (error) {
            this.setState({ uploadStatus: `Error: ${error.message}` });
        }
    };

    render() {
        const { startPoint, locationStatus, endPoint, distance, travelTime, profile, selectedFile, uploadStatus } = this.state;

        if (!startPoint) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2rem' }}><h1>{locationStatus}</h1></div>;
        }

        const buttonStyle = { padding: '8px 12px', margin: '0 5px', borderWidth: '1px', borderStyle: 'solid', borderColor: '#ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff' };
        const activeButtonStyle = { ...buttonStyle, backgroundColor: '#007bff', color: 'white', borderColor: '#007bff' };

        return (
            <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
                <Map ref={this.mapRef} center={startPoint} zoom={13} style={{ height: "100%", width: "100%" }} onClick={this.handleMapClick}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <Marker position={startPoint} icon={customIcon}></Marker>
                    {endPoint && (
                        <Marker position={endPoint} ref={this.destinationMarkerRef} icon={customIcon}>
                            <Popup>
                                <div style={{ minWidth: '150px' }}>
                                    <b>Naujas taškas:</b> {endPoint.lat.toFixed(4)}, {endPoint.lng.toFixed(4)}<br />
                                    <button onClick={this.createRoute} style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                        Sukurti maršrutą čia
                                    </button>
                                    <hr style={{ margin: '10px 0' }} />
                                    <input type="file" ref={this.fileInputRef} onChange={this.handleFileSelect} accept="image/*" style={{ display: 'none' }} />
                                    <button onClick={() => this.fileInputdRef.current.click()} style={{ width: '100%', backgroundColor: '#f0ad4e', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                        Įkelti vaizdą
                                    </button>
                                    {selectedFile && (
                                        <button onClick={this.handleImageUpload} style={{ width: '100%', backgroundColor: '#5bc0de', color: 'white', padding: '10px', marginTop: '5px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                            Upload Now
                                        </button>
                                    )}
                                    {uploadStatus && <p style={{ marginTop: '5px', fontSize: '12px', textAlign: 'center' }}>{uploadStatus}</p>}
                                </div>
                            </Popup>
                        </Marker>
                    )}
                </Map>
                <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: 'white', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', display: 'flex' }}>
                    <button onClick={() => this.handleProfileChange('foot-hiking')} style={profile === 'foot-hiking' ? activeButtonStyle : buttonStyle}>Hike</button>
                    <button onClick={() => this.handleProfileChange('cycling-road')} style={profile === 'cycling-road' ? activeButtonStyle : buttonStyle}>Cycle</button>
                    <button onClick={() => this.handleProfileChange('driving-car')} style={profile === 'driving-car' ? activeButtonStyle : buttonStyle}>Car</button>
                </div>
                {(distance && distance !== 'Calculating...') && (
                    <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px', border: '2px solid #333', fontWeight: 'bold', textAlign: 'right' }}>
                        <div>{distance}</div>
                        {travelTime && <div style={{ marginTop: '5px' }}>{travelTime}</div>}
                    </div>
                )}
            </div>
        );
    }
}

export default PinMap;