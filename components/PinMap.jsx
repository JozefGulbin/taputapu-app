// This is the complete and final code for components/PinMap.jsx

import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ icon: customIcon });


function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) { return `${hours}h ${minutes}m`; }
  return `${minutes}m`;
}


const PinMap = () => {
  const [startPoint, setStartPoint] = useState(null); 
  const [locationStatus, setLocationStatus] = useState("Finding your location...");
  const [endPoint, setEndPoint] = useState(null);
  const [distance, setDistance] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [map, setMap] = useState(null);
  const [profile, setProfile] = useState('foot-hiking');
  const routeLayerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  
  // A new state to trigger the API call
  const [activeRoute, setActiveRoute] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStartPoint({ lat: position.coords.latitude, lng: position.coords.longitude });
        setLocationStatus('');
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationStatus(`Could not get location. Defaulting to Vilnius.`);
        setStartPoint({ lat: 54.6872, lng: 25.2797 });
      }
    );
  }, []);
  
  // This useEffect now ONLY runs when the 'activeRoute' changes
  useEffect(() => {
    // If there's no active route request, do nothing.
    if (!activeRoute || !map) return;
    
    // First, always remove the previous route layer if it exists.
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }
    
    setDistance('Calculating...');
    setTravelTime('');

    const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhlYzVmNDI1Yzc2MTQ3MDE5YzY3NmQ3MmRiOTFmYTVlIiwiaCI6Im11cm11cjY0In0=';
    const { start, end, profile } = activeRoute;
    const url = `/api/ors?profile=${profile}`;
    const body = { coordinates: [ [start.lng, start.lat], [end.lng, end.lat] ] };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKey },
      body: JSON.stringify(body)
    })
    .then(res => {
      if (!res.ok) { return res.json().then(err => { throw new Error(`API Error: ${res.status} - ${err.error?.message || 'Check API key.'}`); }); }
      return res.json();
    })
    .then(data => {
      routeLayerRef.current = L.geoJSON(data).addTo(map);
      const summary = data.features[0].properties.summary;
      const kms = (summary.distance / 1000).toFixed(2);
      const durationInSeconds = summary.duration;
      setDistance(`${kms} km`);
      setTravelTime(formatDuration(durationInSeconds));
    })
    .catch(err => {
      console.error('Routing Error:', err);
      alert(`Could not calculate route.\n\n${err.message}`);
      setDistance("Route Error");
      setTravelTime('');
    });
  }, [activeRoute, map]); // This effect ONLY depends on the activeRoute object


  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setEndPoint(e.latlng);
        setDistance('');
        setTravelTime('');
        if (routeLayerRef.current) {
          map.removeLayer(routeLayerRef.current);
        }
        // When a new pin is dropped, we set activeRoute to null to stop any calculations
        setActiveRoute(null);
        setTimeout(() => { destinationMarkerRef.current?.openPopup(); }, 1);
      },
    });
    return null;
  };

  // The button click now sets the 'activeRoute' state, which triggers the useEffect
  const handleCreateRouteClick = () => {
    if (startPoint && endPoint) {
      setActiveRoute({ start: startPoint, end: endPoint, profile: profile });
    }
  };
  
  // This useEffect updates the route when the PROFILE changes, but only if a route is already active
  useEffect(() => {
      if (activeRoute) {
          setActiveRoute({ start: startPoint, end: endPoint, profile: profile });
      }
  }, [profile]);


  if (!startPoint) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2rem' }}><h1>{locationStatus}</h1></div>;
  }

  const buttonStyle = {
    padding: '8px 12px', margin: '0 5px', borderWidth: '1px', borderStyle: 'solid',
    borderColor: '#ccc', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#fff'
  };
  const activeButtonStyle = { ...buttonStyle, backgroundColor: '#007bff', color: 'white', borderColor: '#007bff' };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer center={startPoint} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        <MapEvents />
        <Marker position={startPoint} icon={customIcon}></Marker>
        {endPoint && (
          <Marker position={endPoint} ref={destinationMarkerRef} icon={customIcon}>
            <Popup>
              <div>
                <b>Naujas taškas:</b> {endPoint.lat.toFixed(4)}, {endPoint.lng.toFixed(4)}<br />
                <button onClick={handleCreateRouteClick} style={{ width: '100%', backgroundColor: '#4CAF50', color: 'white', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Sukurti maršrutą čia
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, background: 'white', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', display: 'flex' }}>
        <button onClick={() => setProfile('foot-hiking')} style={profile === 'foot-hiking' ? activeButtonStyle : buttonStyle}>Hike</button>
        <button onClick={() => setProfile('cycling-road')} style={profile === 'cycling-road' ? activeButtonStyle : buttonStyle}>Cycle</button>
        <button onClick={() => setProfile('driving-car')} style={profile === 'driving-car' ? activeButtonStyle : buttonStyle}>Car</button>
      </div>

      {(distance && distance !== 'Calculating...') && (
         <div style={{ 
            position: 'absolute', top: '20px', right: '20px', zIndex: 1000, 
            background: 'white', padding: '10px', borderRadius: '5px', 
            border: '2px solid #333', fontWeight: 'bold', textAlign: 'right' 
          }}>
           <div>{distance}</div>
           {travelTime && <div style={{marginTop: '5px'}}>{travelTime}</div>}
         </div>
      )}
    </div>
  );
};

export default PinMap;