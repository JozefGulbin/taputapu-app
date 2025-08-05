// In components/PasiklydauView.js - FINAL version with the button fix

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
    locationError: null,
    selectedFile: null,
    uploadStatus: ''
  };

  fileInputRef = React.createRef();

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

  // --- THIS FUNCTION IS NOW BEING CALLED AGAIN ---
  handleShareLocation = () => {
    if (!this.state.position) return;
    const [lat, lon] = this.state.position;
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    navigator.clipboard.writeText(googleMapsUrl).then(() => {
      this.setState({ buttonText: 'Signalus išsiųstas! (Nuoroda nukopijuota)' });
      setTimeout(() => this.setState({ buttonText: 'Siųsti Signalą' }), 3000);
    });
  };

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
      if (!response.ok) { throw new Error('Upload failed.'); }
      const result = await response.json();
      this.setState({ uploadStatus: `Success! Image URL: ${result.url}` });
    } catch (error) {
      this.setState({ uploadStatus: `Error: ${error.message}` });
    }
  };

  render() {
    const { position, locationError, buttonText, selectedFile, uploadStatus } = this.state;

    if (!position) {
      return <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: locationError ? 'red' : 'black' }}>{locationError ? locationError : 'Ieškoma jūsų buvimo vietos...'}</div>;
    }
    
    return (
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <Map center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
          <TileLayer attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup><b>Jūs esate čia.</b></Popup>
          </Marker>
        </Map>
        
        <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            zIndex: 1000, padding: '15px', textAlign: 'center', width: '280px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          <div style={{ marginBottom: '10px', fontSize: '14px' }}>
            <h3 style={{ margin: 0, marginBottom: '5px', fontSize: '16px' }}>Jūsų koordinatės</h3>
            <div><strong>Platuma:</strong> {position[0].toFixed(5)}</div>
            <div><strong>Ilguma:</strong> {position[1].toFixed(5)}</div>
          </div>
          
          <button onClick={this.handleShareLocation} style={{
              width: '100%', padding: '10px', fontSize: '16px', fontWeight: 'bold', color: 'white',
              backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}>
            {buttonText}
          </button>
          
          <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ccc' }} />
          
          <input type="file" ref={this.fileInputRef} onChange={this.handleFileSelect} accept="image/*" style={{ display: 'none' }} />
          <button onClick={() => this.fileInputRef.current.click()} style={{ width: '100%', backgroundColor: '#f0ad4e', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            Įkelti vaizdą
          </button>

          {selectedFile && (
            <button onClick={this.handleImageUpload} style={{ width: '100%', backgroundColor: '#5bc0de', color: 'white', padding: '10px', marginTop: '5px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Upload Now
            </button>
          )}
          
          {uploadStatus && <p style={{ marginTop: '5px', fontSize: '12px', textAlign: 'center' }}>{uploadStatus}</p>}
        </div>
      </div>
    );
  }
}

export default PasiklydauView;