console.log('Hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

const map = L.map('map').setView([51.505, -0.09], 13);

// Set the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Loop through the locations and add markers to the map
locations.forEach(location => {
  L.marker([location.lat, location.lng])
    .addTo(map)
    .bindPopup(`<p>${location.description}</p>`);
});
