/*eslint no-unused-vars: 0 */
import React, { useRef, useState, useEffect, useContext } from 'react';
import { BridgesContext } from '../../../state/bridgesContext';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const initialState = {
  lng: 30.0616,
  lat: -1.9444,
  zoom: 6.5,
};

function DataViz(props) {
  const [data, setData] = useState(initialState);
  const mapContainerRef = useRef(null);
  const [filter, setFilter] = useState('Completed');
  const { bridgeData } = useContext(BridgesContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [data.lng, data.lat],
      zoom: data.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    if (bridgeData) {
      console.log(bridgeData);
      for (let i = 0; i < bridgeData.length; i++) {
        if (bridgeData[i].project_stage === filter) {
          var popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
            '<div style="color:red">' +
              'Country:' +
              `${bridgeData[i].country}` +
              '</div>' +
              `Province:${bridgeData[i].province}` +
              '<br/>' +
              'Communties:' +
              bridgeData[i].communities_served.map(data => ` ${data.name}`)
          );

          var bridgesDummyData = new mapboxgl.Marker()
            .setLngLat([bridgeData[i].long, bridgeData[i].lat])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map); // add the marker to the map
        }
      }
    }

    return () => map.remove();
  }, [bridgeData]);

  return (
    <div className="map-container">
      <div className="map" ref={mapContainerRef} />
    </div>
  );
}

export default DataViz;