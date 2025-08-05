// In components/PasiklydauView.js - The FULL and CORRECT version

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

class PasiklydauView extends React.Component {
  state = {
    position: null,
    buttonText: 'Siųsti Signalą',
    watcherId: null,
    locationError: null
  };

  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({ locationError: 'Jūsų naršyklė nepalaiko GPS funkcijos.' });
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.setState({ position: [latitude, longitude], locationError: null });
      },
      (err) => {
        let errorMessage = 'Nepavyko nustatyti vietos.';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Jūs atmetėte prašymą leisti naudoti GPS. Patikrinkite naršyklės nustatymus.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Vietos informacija neprieinama.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Skirtasis laikas vietos nustatymui baigėsi.';
            break;
          default:
            errorMessage = 'Įvyko nežinoma klaida.';
            break;
        }
        this.setState({ locationError: errorMessage });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    this.setState({ watcherId: watcher });
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
      this.setState({ buttonText: 'Signalus išsiųstas! (Nuoroda nukopijuota)' });
      setTimeout(() => this.setState({ buttonText: 'Siųsti Signalą' }), 3000);
    });
  };

  render() {
    const { position, locationError, buttonText } = this.state;

    // This part handles the loading and error messages
    if (!position) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: locationError ? 'red' : 'black' }}>
          {locationError ? locationError : 'Ieškoma jūsų buvimo vietos...'}
        </div>
      );
    }
    
    // THIS IS THE PART THAT WAS MISSING. It returns the map view.
    return (
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Map center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon}>
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
            <div><strong>Platuma:</strong> {position[0].toFixed(5)}</div>
            <div><strong>Ilguma:</strong> {position[1].toFixed(5)}</div>
          </div>
          <button onClick={this.handleShareLocation} style={{
              padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', color: 'white',
              backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

export default PasiklydauView;