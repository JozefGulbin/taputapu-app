// This is the new, complete, and final code for components/PinMap.jsx

import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- FIX FOR THE BROKEN MARKER ICON URLS ---
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


const PinMap = () => {
  const [startPoint, setStartPoint] = useState(null); 
  const [locationStatus, setLocationStatus] = useState("Finding your location...");
  const [endPoint, setEndPoint] = useState(null);
  const [distance, setDistance] = useState('');
  const destinationMarkerRef = useRef(null);
  const [map, setMap] = useState(null);
  
  // === THIS IS THE FIX FOR THE ROUTE CLEANUP ===
  // We now manage the route layer directly in the main component using a ref.
  const routeLayerRef = useRef(null);

  // This new useEffect hook is responsible for all routing logic.
  // It runs whenever the 'endPoint' changes.
  useEffect(() => {
    // If there's no map or no destination, do nothing.
    if (!map || !endPoint) return;

    // First, always remove the previous route layer if it exists.
    if (routeLayerRef.current) {
      console.log("Removing previous route.");
      map.removeLayer(routeLayerRef.current);
    }
    
    // Show that we are calculating the new route.
    setDistance('Calculating...');

    const apiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjhlYzVmNDI1Yzc2MTQ3MDE5YzY3NmQ3MmRiOTFmYTVlIiwiaCI6Im11cm11cjY0In0='; 
    const url = `/api/ors/v2/directions/foot-hiking/geojson`;
    const body = JSON.stringify({ coordinates: [ [startPoint.lng, startPoint.lat], [endPoint.lng, endPoint.lat] ] });

    fetch(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json, application/geo+json', 'Content-Type': 'application/json', 'Authorization': apiKey },
      body: body
    })
    .then(res => {
      if (!res.ok) { return res.json().then(err => { throw new Error(`API Error: ${res.status} - ${err.error?.message || 'Check API key.'}`); }); }
      return res.json();
    })
    .then(data => {
      // Create the new route layer, add it to the map, and store it in our ref.
      routeLayerRef.current = L.geoJSON(data).addTo(map);
      map.fitBounds(routeLayerRef.current.getBounds());
      const summary = data.features[0].properties.summary;
      const kms = (summary.distance / 1000).toFixed(2);
      setDistance(`${kms} km`);
    })
    .catch(err => {
      console.error('Routing Error:', err);
      alert(`Could not calculate route.\n\nError: ${err.message}`);
      setDistance("Route Error");
    });

  }, [endPoint, map, startPoint]); // This effect depends on these values.


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

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // When the user clicks the map, we simply update the destination (endPoint).
        // This will automatically trigger our main useEffect hook to calculate the new route.
        setEndPoint(e.latlng);
        // We no longer need the popup with the button. The route calculates on click.
      },
    });
    return null;
  };

  if (!startPoint) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '2rem' }}><h1>{locationStatus}</h1></div>;
  }

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer center={startPoint} zoom={13} style={{ height: "100%", width: "100%" }} whenCreated={setMap}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        <MapEvents />
        <Marker position={startPoint} icon={customIcon}></Marker>
        {/* We still show the destination marker */}
        {endPoint && ( <Marker position={endPoint} icon={customIcon}></Marker> )}
      </MapContainer>
      
      {distance && (
         <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px', border: '2px solid #333', fontWeight: 'bold' }}>
           Route Distance: {distance}
         </div>
      )}
    </div>
  );
};

export default PinMap;