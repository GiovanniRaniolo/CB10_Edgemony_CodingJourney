import { API_KEY } from "./keys.js";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};

const moviesContainer = document.getElementById('movies');
const buttons = document.querySelectorAll('#controls button');
const searchInput = document.getElementById('searchInput');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumberSpan = document.getElementById('pageNumber');

let currentPage = 1;
let currentEndpoint = 'popular';
let movieData = [];

// Funzione per creare una card del film
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(overview);

    return card;
}

// Funzione per caricare i film da un endpoint e pagina specifici
function loadMovies(endpoint, page = 1) {
    fetch(`https://api.themoviedb.org/3/movie/${endpoint}?page=${page}`, options)
        .then(response => response.json())
        .then(data => {
            movieData = data.results || [];
            pageNumberSpan.textContent = `Page ${page}`;
            displayMovies(movieData);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'An error occurred while fetching the data. Please try again later.';
            moviesContainer.innerHTML = ''; // Svuota il contenitore dei film
            moviesContainer.appendChild(errorMessage);
        });
}

// Funzione per visualizzare i film nel DOM
function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

// Funzione per filtrare i film
function filterMovies(title, data) {
    const filteredMovies = data.filter(movie => {
        return movie.title.toLowerCase().includes(title.toLowerCase());
    });
    displayMovies(filteredMovies);
}

// Event listener per i pulsanti di controllo
buttons.forEach(button => {
    button.addEventListener('click', () => {
        currentEndpoint = button.dataset.endpoint;
        currentPage = 1;
        loadMovies(currentEndpoint, currentPage);
    });
});

// Event listener per il campo di input del filtro
searchInput.addEventListener('input', () => {
    filterMovies(searchInput.value, movieData);
});

// Event listener per i pulsanti di paginazione
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadMovies(currentEndpoint, currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    loadMovies(currentEndpoint, currentPage);
});

// Carica i film popolari di default
loadMovies('popular', 1);