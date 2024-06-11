const moviesContainer = document.getElementById('movies');
const genreSelect = document.getElementById('genreSelect');
const pageNumberSpan = document.getElementById('pageNumber');

export function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title || movie.name;

    const title = document.createElement('h2');
    title.textContent = movie.title || movie.name;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(overview);

    return card;
}

export function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

export function populateGenreSelect(genres) {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

export function updatePageNumber(page) {
    pageNumberSpan.textContent = `Page ${page}`;
}

export function showError(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    moviesContainer.innerHTML = '';
    moviesContainer.appendChild(errorMessage);
}