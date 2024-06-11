import { fetchGenres, fetchMovies, searchMovies } from './api.js';
import { displayMovies, populateGenreSelect, updatePageNumber, showError } from './domUtils.js';

const categoryButtons = document.querySelectorAll('#controls button');
const typeButtons = document.querySelectorAll('#type-controls button');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const firstPageBtn = document.getElementById('firstPage');
const prev10PageBtn = document.getElementById('prev10Page');
const next10PageBtn = document.getElementById('next10Page');
const next100PageBtn = document.getElementById('next100Page');

let currentPage = 1;
let currentEndpoint = 'popular';
let currentType = 'movie';
let currentGenre = '';
let totalPages = 1;

async function loadGenres() {
    try {
        const data = await fetchGenres(currentType);
        populateGenreSelect(data.genres);
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

async function loadMovies(endpoint, page = 1) {
    try {
        const data = await fetchMovies(endpoint, currentType, currentGenre, page);
        totalPages = data.total_pages;
        updatePageNumber(page);
        displayMovies(data.results);
    } catch (err) {
        console.error('Fetch error:', err);
        showError('An error occurred while fetching the data. Please try again later.');
    }
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentEndpoint = button.dataset.endpoint;
        currentPage = 1;
        loadMovies(currentEndpoint, currentPage);
    });
});

typeButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentType = button.dataset.type;
        currentPage = 1;
        loadGenres();
        loadMovies(currentEndpoint, currentPage);
    });
});

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        loadMovies(currentEndpoint, currentPage);
    } else {
        searchMovies(searchInput.value, currentType).then(data => {
            displayMovies(data.results);
        }).catch(err => {
            console.error('Search error:', err);
        });
    }
});

genreSelect.addEventListener('change', () => {
    currentGenre = genreSelect.value;
    loadMovies(currentEndpoint, currentPage);
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadMovies(currentEndpoint, currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadMovies(currentEndpoint, currentPage);
    }
});

firstPageBtn.addEventListener('click', () => {
    currentPage = 1;
    loadMovies(currentEndpoint, currentPage);
});

prev10PageBtn.addEventListener('click', () => {
    if (currentPage === 1 || currentPage <= 10) {
        currentPage = 1;
    } else {
        currentPage -= 10;
    }
    loadMovies(currentEndpoint, currentPage);
});

next10PageBtn.addEventListener('click', () => {
    if (currentPage === 1) {
        currentPage = 10;
    } else {
        currentPage += 10;
    }
    loadMovies(currentEndpoint, currentPage);
});

next100PageBtn.addEventListener('click', () => {
    if (currentPage === 1) {
        currentPage = 50;
    } else {
        currentPage += 50;
    }
    loadMovies(currentEndpoint, currentPage);
});


export { loadGenres, loadMovies };