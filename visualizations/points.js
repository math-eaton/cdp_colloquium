const mapWidth = 1280;
const mapHeight = 720;
const mapPadding = 5;

// Define the projection for the map
const projection = d3.geoAlbersUsa()
  .translate([mapWidth / 2, mapHeight / 2])
  .scale(1500);

// Create the SVG container for the map
const svg = d3.select('#map-container')
  .append('svg')
  .attr('width', mapWidth)
  .attr('height', mapHeight);

// Load the US states GeoJSON data
d3.json('data/states_110m.json').then(function (states) {
  // Create a path generator for the map projection
  const path = d3.geoPath().projection(projection);

  // Draw the state boundaries as a basemap
  svg.selectAll('.state')
    .data(states.features)
    .enter()
    .append('path')
    .attr('class', 'state')
    .attr('d', path);

  // Load the CSV data
  d3.csv('data/fcc_geog_lookupTable.csv').then(function (data) {
    // Convert the longitude and latitude values to numbers
    data.forEach(function (d) {
      d.centroid_lng = +d.centroid_lng;
      d.centroid_lat = +d.centroid_lat;
    });
    console.log("Loaded CSV");

    // Draw points on the map based on the data
    const batchPoints = svg.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .filter(function (d) {
        const projected = projection([d.centroid_lng, d.centroid_lat]);
        return projected !== null;
      })
      .attr('class', 'point')
      .attr('cx', function (d) { return projection([d.centroid_lng, d.centroid_lat])[0]; })
      .attr('cy', function (d) { return projection([d.centroid_lng, d.centroid_lat])[1]; })
      .attr('r', 0.25)
      .style('fill', 'rgba(152, 251, 152, 0.865)');

    // Apply a debounce function to delay rendering points
    const debounceRender = debounce(function () {
      batchPoints.attr('visibility', 'visible');
    }, 200); // Adjust the delay time as needed

    // Call the debounced rendering function
    debounceRender();
  });
});

// Debounce function to delay rendering
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
