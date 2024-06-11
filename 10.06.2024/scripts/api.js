import { API_KEY } from "../keys.js";

const BASE_URL = 'https://api.themoviedb.org/3/';
const options = {
    headers: {
        accept: 'application/json',
        Authorization: API_KEY
    }
};

export async function fetchGenres(type) {
    const url = `${BASE_URL}genre/${type}/list`;
    const response = await fetch(url, options);
    return response.json();
}

export async function fetchMovies(endpoint, type, genre, page) {
    let url;
    if (genre) {
        url = `${BASE_URL}discover/${type}?page=${page}&with_genres=${genre}`;
    } else {
        url = `${BASE_URL}${type}/${endpoint}?page=${page}`;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

export async function searchMovies(query, type) {
    const url = `${BASE_URL}search/${type}?query=${query}`;
    const response = await fetch(url, options);
    return response.json();
}
