// In components/PasiklydauView.js - FOR REACT-LEAFLET V2

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icon fix - this part remains the same
const customIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

class PasiklydauView extends React.Component {
  state = {
    position: null,
    // --- CHANGED THIS LINE ---
    buttonText: 'Siųsti Signalą', // New button text
    watcherId: null
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          this.setState({ position: [latitude, longitude] });
        },
        (err) => { console.error(err); },
        { enableHighAccuracy: true }
      );
      this.setState({ watcherId: watcher });
    }
  }

  componentWillUnmount() {
    if (this.state.watcherId) {
      navigator.geolocation.clearWatch(this.state.watcherId);
    }
  }

  handleShareLocation = () => {
    if (!this.state.position) return;
    const [lat, lon] = this.state.position;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    navigator.clipboard.writeText(googleMapsUrl).then(() => {
      this.setState({ buttonText: 'Signalus išsiųstas! (Nuoroda nukopijuota)' }); // "Signal Sent! (Link Copied)"
      // --- AND CHANGED THIS LINE ---
      setTimeout(() => this.setState({ buttonText: 'Siųsti Signalą' }), 3000); // Reset to new text
    });
  };

  render() {
    if (!this.state.position) {
      return <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px' }}>Ieškoma jūsų buvimo vietos...</div>;
    }
    
    return (
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Map center={this.state.position} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={this.state.position} icon={customIcon}>
            <Popup>Jūs esate čia.</Popup>
          </Marker>
        </Map>
        <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 1000, padding: '10px', textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
            <h3 style={{ margin: 0, marginBottom: '5px', fontSize: '16px' }}>Jūsų koordinatės</h3>
            <div><strong>Platuma:</strong> {this.state.position[0].toFixed(5)}</div>
            <div><strong>Ilguma:</strong> {this.state.position[1].toFixed(5)}</div>
          </div>
          <button onClick={this.handleShareLocation} style={{
              padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', color: 'white',
              backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}>
            {this.state.buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default PasiklydauView;