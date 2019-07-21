import http from './httpService.js';
import env from "../env.js";



export function getMovies() {
    return http.get(`${env.api}/api/movies`);
}


export function getMovie() {
    return http.get(`${env.api}/api/movies`);
}

export function saveMovie(movie) {
    return http.get(`${env.api}/api/movies`);
}


export function deleteMovie(movieId) {
    return http.get(`${env.api}/api/movies`);
}