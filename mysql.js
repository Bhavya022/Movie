const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to the MySQL database
require('dotenv').config();
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Define the route for adding a movie to favorites
app.post('/favorites', async (req, res) => {
  const movie = req.body;

  const connection = await connectionPool.getConnection();

  const query = `INSERT INTO favorites (id, imdbID, title, year, type, poster, isFavorite) VALUES (?, ?, ?, ?, ?, ?, 1) ON DUPLICATE KEY UPDATE isFavorite = 1`;
  const preparedStatement = await connection.prepare(query);

  await preparedStatement.execute([movie.id, movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster]);

  await preparedStatement.close();
  await connection.release();

  res.json({ message: 'Movie added to favorites' });
});

// Start the server
app.listen(4400, () => {
  console.log('Server listening on port 4400');
});
