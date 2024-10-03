console.log('Hello from the client side')

const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations)

const map = locations.map('map').setView([51.505, -0.09], 13);

locations.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);