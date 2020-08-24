import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const mapSetUp = (initalCoordinates, mapContainerRef) => {
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [initalCoordinates.lng, initalCoordinates.lat],
    zoom: initalCoordinates.zoom,
  });
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map.addControl(new mapboxgl.FullscreenControl());
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,

      zoom: 14,
      countries: 'rw',
      placeholder: 'Enter search e.g. Completed',
    }),
    'top-left'
  );
  return map;
};

const popUpSetUp = bridgeData => {
  var popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
    '<div style="color:red">' +
      'Country:' +
      `${bridgeData.country}` +
      '</div>' +
      `Province:${bridgeData.province}` +
      '<br/>' +
      'Communties:' +
      bridgeData.communities_served.map(data => ` ${data.name}`)
  );
  return popup;
};

const markerSetUp = (
  map,
  popUp,
  markerColor,
  bridgeDataObj,
  setDetailsData
) => {
  let marker = new mapboxgl.Marker({
    color: markerColor,
  })
    .setLngLat([bridgeDataObj.long, bridgeDataObj.lat])
    .setPopup(popUp) // sets a popup on this marker
    .addTo(map); // add the marker to the map
  marker.getElement().addEventListener('click', () => {
    setDetailsData(bridgeDataObj);
  });
  return marker;
};

export { mapSetUp, popUpSetUp, markerSetUp };
