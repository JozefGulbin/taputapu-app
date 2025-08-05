// In components/PasiklydauView.js - NOW WITH ERROR HANDLING

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
    // NEW: State to hold any error messages
    locationError: null 
  };

  componentDidMount() {
    if (!navigator.geolocation) {
      this.setState({ locationError: 'Jūsų naršyklė nepalaiko GPS funkcijos.' }); // "Your browser does not support Geolocation."
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      // Success Callback (this stays the same)
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.setState({ position: [latitude, longitude], locationError: null }); // Clear any previous errors on success
      },
      // NEW: Error handling callback
      (err) => {
        let errorMessage = 'Nepavyko nustatyti vietos.'; // "Could not get location."
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Jūs atmetėte prašymą leisti naudoti GPS. Patikrinkite naršyklės nustatymus.'; // "You denied the request for Geolocation. Check browser settings."
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Vietos informacija neprieinama.'; // "Location information is unavailable."
            break;
          case err.TIMEOUT:
            errorMessage = 'Skirtasis laikas vietos nustatymui baigėsi.'; // "The request to get user location timed out."
            break;
          default:
            errorMessage = 'Įvyko nežinoma klaida.'; // "An unknown error occurred."
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

  handleShareLocation = () => { /* ... this function does not need changes ... */ };

  render() {
    const { position, locationError } = this.state;

    // Show a loading or error message before the map
    if (!position) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: locationError ? 'red' : 'black' }}>
          {locationError ? locationError : 'Ieškoma jūsų buvimo vietos...'}
        </div>
      );
    }
    
    // The rest of the return statement does not need changes...
    return (
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        {/* ... map and controls ... */}
      </div>
    );
  }
}

export default PasiklydauView;