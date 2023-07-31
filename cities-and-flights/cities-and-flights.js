// Load the data.
let cityData
let flightData
function preload () {
  cityData = loadTable('./cities.csv', 'csv', 'header');
  flightData = loadTable('./flights.csv', 'csv', 'header');
}

// Global variables for our sketch. Not "best practice" per se, but it works for sketches.
let cities = []
let flights = []
let worldmap
let flightPath

function setup () {
  // Fill the browser window with a canvas.
  createCanvas(window.innerWidth, window.innerHeight);

  // Load the city data rows into our abstraction.
  for (const row of cityData.rows) {
    const city = new City(row.obj.City, float(row.obj.Latitude), float(row.obj.Longitude))
    cities.push(city);
  }

  worldmap = loadImage('./worldMap-transparent.png');

  for (const row of flightData.rows) {
    const origin = cities.find(city => city.name === row.obj.Origin);
    const destination = cities.find(city => city.name === row.obj.Destination);

    if (origin && destination) {
      const flight = new Flight(origin, destination);
      flights.push(flight);
    }
  }

  // Example usage
  const origin = 'Tokyo';
  const destination = 'New York City';
  flightPath = findFlights(origin, destination);
}

function draw () {
  background(color('black'));
  strokeWeight(1);
  stroke(color('darkred'));

  push();
  scale(width / worldmap.width, height / worldmap.height);
  image(worldmap, 0, 0);
  pop();

  for (const cityName in cities) {
    const city = cities[cityName];
    city.draw();
  }

  for (const flight of flights) {
    flight.draw();
  }

  strokeWeight(4);
  stroke(color(0, 255, 0));
  for (const flight of flightPath) {
    flight.draw();
  }
}

class City {
  constructor(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;

    this.flights = [];

    this.x = map(this.longitude, -180, 180, 0, width);
    this.y = map(this.latitude, -90, 90, height, 0);
  }

  addFlight (flight) {
    this.flights.push(flight);
  }

  draw () {
    circle(this.x, this.y, 10, 10);
  }
}

class Flight {
  constructor (origin, destination) {
    this.origin = origin;
    this.destination = destination;

    this.origin.addFlight(this);
    this.destination.addFlight(this);
  }

  draw () {
    line(this.origin.x, this.origin.y, this.destination.x, this.destination.y);
  }
}

function findDirectFlights(originCityName, destinationCityName) {
  const originCity = cities.find(city => city.name === originCityName);
  const destinationCity = cities.find(city => city.name === destinationCityName);

  if (!originCity || !destinationCity) {
    return [];
  }

  const result = [];

  for (const flight of originCity.flights) {
    if (flight.destination === destinationCityName) {
      result.push(flight);
    }
  }

  return result;
}

function findFlights(originCityName, destinationCityName) {
  const originCity = cities.find(city => city.name === originCityName);
  const destinationCity = cities.find(city => city.name === destinationCityName);

  if (!originCity || !destinationCity) {
    return [];
  }

  const visited = new Set();
  const path = [];

  // Depth-First Search (DFS) function
  function dfs(currentCity) {
    visited.add(currentCity);

    if (currentCity === destinationCity) {
      return true; // Found a path to the destination
    }

    for (const flight of currentCity.flights) {
      const nextCity = flight.destination;

      if (nextCity && !visited.has(nextCity)) {
        path.push(flight);
        if (dfs(nextCity)) {
          return true; // Found a path to the destination
        }
        path.pop();
      }
    }

    return false; // No path found
  }

  dfs(originCity);

  return path;
}