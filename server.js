const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to the MySQL database
require('dotenv').config();
// Configure MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define the routes for the application
app.get('/', (req, res) => {
  // Get the list of movies from the database
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Error querying movies:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.get('/getFavorites', (req, res) => {
  // Query the database to retrieve favorite movies
  const query = 'SELECT * FROM movies WHERE isFavorite = 1';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error querying favorite movies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/favorites', (req, res) => {
  // Get the movie information from the request body
  const movie = req.body;

  // Add the movie to the favorites list
  connection.query(
    'INSERT INTO movies (imdbID, title, year, type, poster, isFavorite) VALUES (?, ?, ?, ?, ?, 1)',
    [movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster],
    (err) => {
      if (err) {
        console.error('Error adding movie to favorites:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).send('Movie added to favorites');
      }
    }
  );
});

app.post('/addFavorite', (req, res) => {
  const movie = req.body; // Assuming the client sends the entire movie object

  // Check if the movie is already in the favorites list
  const query = `SELECT * FROM movies WHERE imdbID = ?`;
  connection.query(query, [movie.imdbID], (err, results) => {
    if (err) {
      console.error('Error querying favorite movies:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results && results.length > 0) {
        // The movie is already in the favorites list
        res.json({ message: 'Movie is already in favorites' });
      } else {
        // The movie is not in the favorites list, so add it
        const insertQuery = `INSERT INTO movies (imdbID, title, year, type, poster, isFavorite) VALUES (?, ?, ?, ?, ?, 1)`;
        connection.query(
          insertQuery,
          [movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster],
          (err) => {
            if (err) {
              console.error('Error adding movie to favorites:', err);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              res.json({ message: 'Movie added to favorites' });
            }
          }
        );
      }
    }
  });
});

app.listen(8900, () => {
  console.log('Movie search application is running on port 8900');
});
