import { loadGenres, loadMovies } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    loadMovies('popular', 1);
});