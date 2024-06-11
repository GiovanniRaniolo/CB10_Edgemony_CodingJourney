const moviesContainer = document.getElementById('movies');
const genreSelect = document.getElementById('genreSelect');
const pageNumberSpan = document.getElementById('pageNumber');

// Funzione per creare una card del film
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

// Funzione per visualizzare i film/serie TV nel DOM
export function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

// Funzione per popolare il menu a tendina dei generi
export function populateGenreSelect(genres) {
    genreSelect.innerHTML = '<option value="">All Genres</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

// Funzione per aggiornare il numero di pagina nel DOM
export function updatePageNumber(page) {
    pageNumberSpan.textContent = `Page ${page}`;
}

// Funzione per mostrare un messaggio di errore
export function showError(message) {
    moviesContainer.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    moviesContainer.appendChild(errorMessage);
}