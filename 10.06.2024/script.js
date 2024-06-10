import { API_KEY } from "./keys.js";

const options = {
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};

const moviesContainer = document.getElementById('movies');
const categoryButtons = document.querySelectorAll('#controls button');
const typeButtons = document.querySelectorAll('#type-controls button');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumberSpan = document.getElementById('pageNumber');

let currentPage = 1;
let currentEndpoint = 'popular';
let currentType = 'movie';
let currentGenre = ''; 
let movieData = [];

// Funzione per creare una card del film
function createMovieCard(movie) {
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

// Funzione per caricare i generi
async function loadGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/${currentType}/list`, options);
        const data = await response.json();
        populateGenreSelect(data.genres);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

// Funzione per popolare il menu a tendina dei generi
function populateGenreSelect(genres) {
    genreSelect.innerHTML = '<option value="">All Genres</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
    });
}

// Funzione per caricare i film/serie TV da un endpoint e pagina specifici
async function loadMovies(endpoint, page = 1) {
    try {
        let url = `https://api.themoviedb.org/3/${currentType}/${endpoint}?page=${page}`;
        if (currentGenre) {
            url += `&with_genres=${currentGenre}`;
        }
        console.log("URL: ", url);
        const response = await fetch(url, options);
        const data = await response.json();
        movieData = data.results;
        pageNumberSpan.textContent = `Page ${page}`;
        displayMovies(movieData);
    } catch (err) {
        console.error('Fetch error:', err);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'An error occurred while fetching the data. Please try again later.';
        moviesContainer.innerHTML = '';
        moviesContainer.appendChild(errorMessage);
    }
}

// Funzione per visualizzare i film/serie TV nel DOM
function displayMovies(movies) {
    console.log("Movies: ", movies);
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
}

// Funzione per filtrare i film/serie TV
function filterMovies(title, data) {
    const filteredMovies = data.filter(movie => {
        if (currentType === 'movie') {
            return movie.title.toLowerCase().includes(title.toLowerCase());
        } else {
            return movie.name.toLowerCase().includes(title.toLowerCase());
        }
    });
    displayMovies(filteredMovies);
}

// Event listener per i pulsanti di controllo delle categorie
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentEndpoint = button.dataset.endpoint;
        currentPage = 1;
        loadMovies(currentEndpoint, currentPage);
    });
});

// Event listener per i pulsanti di controllo del tipo di dati
typeButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentType = button.dataset.type;
        currentPage = 1;
        loadGenres();
        loadMovies(currentEndpoint, currentPage);
    });
});

// Event listener per il campo di input del filtro
searchInput.addEventListener('input', () => {
    filterMovies(searchInput.value, movieData);
});

// Event listener per il menu a tendina dei generi
genreSelect.addEventListener('change', () => {
    currentGenre = genreSelect.value;
    loadMovies(currentEndpoint, currentPage);
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
loadGenres();
loadMovies('popular', 1);