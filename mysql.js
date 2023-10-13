const mysql2 = require('mysql2');

module.exports = {
  addFavorite: function(imdbID) {
    const connection = mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'bhavya22',
      database: 'moviedb'
    });

    connection.connect((err) => {
      if (err) {
        console.error(err);
        return;
      }

      const query = `INSERT INTO favorites (id, imdbID, title, year, type, poster, isFavorite) VALUES (?, ?, ?, ?, ?, ?, 1)`;
      connection.query(query, [imdbID], (err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log('Movie added to favorites');
      });
    });
  }
};
