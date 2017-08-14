const google = window.google;

export default function initAutocomplete(elementId, updatePlaces, dropState) {
  const searchField = document.getElementById(elementId);
  const places = new google.maps.places.Autocomplete(searchField);

  google.maps.event.addListener(places, 'place_changed', () => {
    const place = places.getPlace();
    const placeName = place.formatted_address;
    const lat = place.geometry.location.lat();
    const lon = place.geometry.location.lng();

    updatePlaces(lat, lon, placeName);
    dropState();
  });
}
