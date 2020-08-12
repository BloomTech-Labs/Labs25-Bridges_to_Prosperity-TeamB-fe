import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';
import Data from './bridgesData.json';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState = {
  lng: 30.0616,
  lat: -1.9444,
  zoom: 6.5,
};

function DataViz(props) {
  const [data, setData] = useState(initialState);
  const mapContainerRef = useRef(null);
  const [filter, setFilter] = useState('Approved');

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [data.lng, data.lat],
      zoom: data.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    var i;
    for (i = 0; i < Data.length; i++) {
      console.log(Data[i].project_stage);
      if (Data[i].project_stage === filter) {
        var popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
          '<div style="color:red">' +
            'Country:' +
            `${Data[i].country}` +
            '</div>' +
            `Province:${Data[i].province}` +
            '<br/>' +
            'Communties:' +
            Data[i].communities_served.map(data => ` ${data.name}`)
        );

        var bridgesDummyData = new mapboxgl.Marker()
          .setLngLat([Data[i].long, Data[i].lat])
          .setPopup(popup) // sets a popup on this marker
          .addTo(map); // add the marker to the map
      }
    }

    return () => map.remove();
  }, []);

  return (
    <>
      <div className="map-container" ref={mapContainerRef}></div>
    </>
  );
}

export default DataViz;
