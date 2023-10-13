// Define a function to create a movie card
function createMovieCard(movie) { 
  console.log(movie) 
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.innerHTML = `${movie.title} (${movie.year || 'Year Unknown'})`;

  const type = document.createElement('p');
  type.innerHTML = `Type: ${movie.type || 'Type Unknown'}`;

  const poster = document.createElement('img');
  poster.src = `${movie.poster || 'No Poster Available'}`;

  card.appendChild(title);
  card.appendChild(type);
  card.appendChild(poster);

  return card;
}

// Define the function to handle displaying favorite movies
async function handleFavorites() {
  try {
    // Fetch the list of favorite movies from your server
    const response = await fetch('http://127.0.0.1:8900/getFavorites');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const favoriteMovies = await response.json();
    console.log(favoriteMovies)
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
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    alert('An error occurred while fetching your favorite movies.');
  }
}

// Call the handleFavorites function to load and display favorite movies when the page loads
window.onload = handleFavorites;
