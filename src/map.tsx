import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWJkdWwwOTU3IiwiYSI6ImNraG9tYjJueTAzNXQyeXRrNzh4NDBlbmcifQ.3CQ0p_HBVavofv5TaASzvA';

const Map = () => {
  const mapContainerRef:any = useRef(null);

  const [lng, setLng] = useState(74.3233379650232);
  const [lat, setLat] = useState(31.481747846041145);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map:any = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
