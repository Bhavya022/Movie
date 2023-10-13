function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.innerHTML = `${movie.Title} (${movie.Year || 'Year Unknown'})`;

  const type = document.createElement('p');
  type.innerHTML = `Type: ${movie.Type || 'Type Unknown'}`;

  const poster = document.createElement('img');
  poster.src = `${movie.Poster || 'No Poster Available'}`;

  card.appendChild(title);
  card.appendChild(type);
  card.appendChild(poster);

  return card;
}

function handleFavorites() {
  // Get the list of favorite movies from the server
  fetch('http://127.0.0.1:8900/getFavorites') // Update this URL according to your server route
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((favoriteMovies) => {
      console.log(favoriteMovies); // Log the favoriteMovies data
      const moviesList = document.getElementById('moviesList');
      moviesList.innerHTML = '';

      if (favoriteMovies && favoriteMovies.length > 0) {
        favoriteMovies.forEach((movie) => {
          const card = createMovieCard(movie);
          moviesList.appendChild(card);
        });
      } else {
        // Display a message when no favorite movies are found
        moviesList.innerHTML = '<p>No favorites found.</p>';
      }
    })
    .catch((error) => {
      console.error('Error fetching favorite movies:', error);
    });
}

// Call the handleFavorites function to load and display favorite movies when the page loads
window.onload = handleFavorites;
