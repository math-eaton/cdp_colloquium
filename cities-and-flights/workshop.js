let vibes = {
    songs: [],
    addSong: function(song) {
      this.songs.push(song);
    },
    getSongByIndex: function(index) {
      return this.songs[index];
    },
    getSongByTitle: function(title) {
      for (const song of this.songs) {
        if (song.title.toLowerCase() === title.toLowerCase()) {
          return song;
        }
      }
      return null; // Song not found
    },
    getSongsByGenre: function(genre) {
      const matchingSongs = [];
      for (const song of this.songs) {
        if (song.genre.toLowerCase() === genre.toLowerCase()) {
          matchingSongs.push(song);
        }
      }
      return matchingSongs;
    },
    getPopularSongs: function() {
      const popularSongs = [];
      for (const song of this.songs) {
        if (song.popularity >= 80) {
          popularSongs.push(song);
        }
      }
      return popularSongs;
    }
  };
  
  function preload() {
    // Load the CSV file
    table = loadTable('songs.csv', 'csv', 'header');
  }
  
  function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  
    // Parse the CSV data and load songs into the "vibes" model
    for (let i = 0; i < table.getRowCount(); i++) {
      const row = table.getRow(i);
      const song = {
        title: row.getString('Song'),
        tempo: row.getNum('Tempo'),
        genre: row.getString('Genre'),
        danceability: row.getNum('Danceability'),
        energy: row.getNum('Energy'),
        loudness: row.getNum('Loudness'),
        valence: row.getNum('Valence'),
        popularity: row.getNum('Popularity')
      };
      vibes.addSong(song);
    }
  }
  
  function draw() {
    background(440);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
  
    const genres = Array.from(new Set(vibes.songs.map(song => song.genre))); // Get unique genres
  
    // Draw legend
    const legendX = width - 200;
    const legendY = 20;
    const legendSize = 15;
    const legendSpacing = 20;
    for (let i = 0; i < genres.length; i++) {
      const genre = genres[i];
      const legendTextX = legendX + legendSize + 5;
      const legendTextY = legendY + i * legendSpacing + legendSize / 2;
      const legendColor = getColorForGenre(genre);
      fill(legendColor);
      rect(legendX, legendY + i * legendSpacing, legendSize, legendSize);
      fill(0);
      textAlign(LEFT, CENTER);
      text(genre, legendTextX, legendTextY);
    }
  
    // Iterate over the loaded songs and create 3D shapes with labels
    for (let i = 0; i < vibes.songs.length; i++) {
      const song = vibes.getSongByIndex(i);
      const x = map(song.tempo, 80, 180, -width / 2, width / 2);
      const y = map(song.energy, 0, 1, -height / 2, height / 2);
      const z = map(song.valence, 0, 1, -200, 200);
  
      push();
      translate(x, y, z);
  
      const pointColor = getColorForGenre(song.genre);
      fill(pointColor);
      noStroke();
      sphere(8);
  
      const labelX = 15;
      const labelY = -20;
      const labelZ = 15;
      const labelColor = color(0);
      const labelTextSize = 10;
      const labelTextAlign = CENTER;
  
      push();
      translate(labelX, labelY, labelZ);
      fill(labelColor);
      textAlign(labelTextAlign);
      textSize(labelTextSize);
      text(song.title, 0, 0);
      pop();
  
      pop();
    }
  }
  
  function getColorForGenre(genre) {
    switch (genre.toLowerCase()) {
      case 'pop':
        return color(255, 0, 0); // Red
      case 'rock':
        return color(0, 255, 0); // Green
      case 'hip-hop':
        return color(0, 0, 255); // Blue
      case 'r&b':
        return color(255, 255, 0); // Yellow
      case 'edm':
        return color(255, 0, 255); // Magenta
      default:
        return color(128); // Gray for unknown genres
    }
  }
  