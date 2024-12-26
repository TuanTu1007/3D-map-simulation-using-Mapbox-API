import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXMyMDAzIiwiYSI6ImNtM2ZhcTdhbjBueWwyanB5NGsxY3V3M3cifQ.4gW5S9bQj9h63cF5YnZ01Q';

const DirectionsSidebar = ({ map }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [mode, setMode] = useState('driving');
  const startGeocoderRef = useRef(null);
  const endGeocoderRef = useRef(null);

  useEffect(() => {
    if (map) {
      // Initialize Starting Point Geocoder
      if (!startGeocoderRef.current) {
        const startGeocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          placeholder: 'Starting Point',
          mapboxgl: mapboxgl,
        });
        startGeocoder.on('result', (e) => {
          setStartPoint(e.result.geometry.coordinates);
        });
        startGeocoderRef.current = startGeocoder;
        document.getElementById('start-geocoder').appendChild(startGeocoder.onAdd(map));
      }

      // Initialize End Point Geocoder
      if (!endGeocoderRef.current) {
        const endGeocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          placeholder: 'End Point',
          mapboxgl: mapboxgl,
        });
        endGeocoder.on('result', (e) => {
          setEndPoint(e.result.geometry.coordinates);
        });
        endGeocoderRef.current = endGeocoder;
        document.getElementById('end-geocoder').appendChild(endGeocoder.onAdd(map));
      }
    }
  }, [map]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  
    if (!isSidebarOpen && 'geolocation' in navigator) {
      // Get user's current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentCoords = [longitude, latitude];
          setStartPoint(currentCoords);
  
          try {
            // Call Reverse Geocoding API to get location name
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              // Get the first matching location (e.g., city or address)
              const locationName = data.features[0].place_name;
  
              // Set the name as default input in Geocoder
              if (startGeocoderRef.current) {
                startGeocoderRef.current.setInput(locationName);
              }
            } else {
              alert('Unable to detect location name.');
            }
          } catch (error) {
            console.error('Error fetching reverse geocoding data:', error);
            alert('Failed to retrieve location name.');
          }
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
          alert('Unable to retrieve your location. Please allow location access.');
        }
      );
    }
  };

  const getDirections = async () => {
    if (!startPoint || !endPoint) {
      alert('Please provide both start and end locations.');
      return;
    }
    const directionsURL = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${startPoint.join(",")};${endPoint.join(",")}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(directionsURL);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;
        if (map) {
          const routeSource = map.getSource('route');
          if (routeSource) {
            routeSource.setData({
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: route,
              },
            });
          } else {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: route,
                },
              },
            });
            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#0074D9',
                'line-width': 4,
              },
            });
          }
        }
      } else {
        alert('No routes found.');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className={`px-4 py-2 text-white rounded-md shadow-md ${
          isSidebarOpen ? 'bg-blue-500 text-white hover:bg-gray-700' : 'bg-gray-700 text-white hover:bg-blue-500'}`}
      >
        Directions
      </button>
      <div
        className={`fixed top-10 left-0 w-80 h-100 bg-gray-100 shadow-lg p-4 transition-transform ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Get Directions</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-red-500 focus:outline-none transition-colors duration-300"
          >
            ✖
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Starting Point</label>
          <div id="start-geocoder" className="w-full"></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">End Point</label>
          <div id="end-geocoder"></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Mode</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="driving">Driving</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
            <option value="transit">Transit</option>
          </select>
        </div>
        <button
          onClick={getDirections}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-gray-700"
        >
          Find Route
        </button>
      </div>
    </div>
  );
};

export default DirectionsSidebar;
