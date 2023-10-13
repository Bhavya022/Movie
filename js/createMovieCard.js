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
  
  export default createMovieCard;
  