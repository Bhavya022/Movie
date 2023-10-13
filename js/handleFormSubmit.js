// function addFavorite(movie) {
//   fetch('http://127.0.0.1:8900/addFavorite', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ movie}), // Send the imdbID in the request body
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.message); // Log the response message from the server
//     })
//     .catch((error) => {
//       console.error('Error adding to favorites:', error);
//     });
// }

// // Function to create a movie card
// function createMovieCard(movie) { 
//   console.log(movie) 
//   const card = document.createElement('div');
//   card.classList.add('card');

//   const title = document.createElement('h3');
//   title.innerHTML = `${movie.Title} (${movie.Year})`;

//   const type = document.createElement('p');
//   type.innerHTML = `Type: ${movie.Type}`;

//   const poster = document.createElement('img');
//   poster.src = `${movie.Poster}`;

//   const favoriteButton = document.createElement('button');
//   favoriteButton.classList.add('favorite');
//   favoriteButton.addEventListener("click", (e)  => { 
//     console.log(movie)
//     addFavorite(movie); 
//   });
//   favoriteButton.innerHTML = 'Favorite';

//   card.appendChild(title);
//   card.appendChild(type);
//   card.appendChild(poster);
//   card.appendChild(favoriteButton);

//   return card;
// }

// let submitBtn = document.getElementById("submitBtn");

// submitBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   const searchString = document.getElementById('searchString').value;
//   console.log(searchString);
//   // Fetch the list of movies from the OMDB API
//   fetch(`http://www.omdbapi.com/?apikey=9c64e934&s=${searchString}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Display the results in a list
//       const moviesList = document.getElementById('moviesList');
//       moviesList.innerHTML = '';

//       console.log(data.Search);

//       if (data.Search && data.Search.length > 0) {
//         data.Search.forEach((movie) => {
//           const card = createMovieCard(movie);
//           moviesList.appendChild(card);
//         });
//       } else {
//         // Display a message when no movies are found
//         moviesList.innerHTML = '<p>No movies found.</p>';
//       }
//     });
// });

function addFavorite(movie) {
  fetch('http://127.0.0.1:8900/addFavorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie), // Send the movie object in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.message); // Log the response message from the server
    })
    .catch((error) => {
      console.error('Error adding to favorites:', error);
    });
}

// Function to create a movie card
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h3');
  title.innerHTML = `${movie.Title} (${movie.Year})`;

  const type = document.createElement('p');
  type.innerHTML = `Type: ${movie.Type}`;

  const poster = document.createElement('img');
  poster.src = movie.Poster;

  const favoriteButton = document.createElement('button');
  favoriteButton.classList.add('favorite');
  favoriteButton.onclick = () => {
    addFavorite(movie);
  };
  favoriteButton.innerHTML = 'Favorite';

  card.appendChild(title);
  card.appendChild(type);
  card.appendChild(poster);
  card.appendChild(favoriteButton);

  return card;
}

let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchString = document.getElementById('searchString').value;

  // Fetch the list of movies from the OMDB API
  fetch(`http://www.omdbapi.com/?apikey=9c64e934&s=${searchString}`)
    .then((response) => response.json())
    .then((data) => {
      // Display the results in a list
      const moviesList = document.getElementById('moviesList');
      moviesList.innerHTML = '';

      if (data.Search && data.Search.length > 0) {
        data.Search.forEach((movie) => {
          const card = createMovieCard(movie);
          moviesList.appendChild(card);
        });
      } else {
        // Display a message when no movies are found
        moviesList.innerHTML = '<p>No movies found.</p>';
      }
    });
});
