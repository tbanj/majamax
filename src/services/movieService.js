import http from './httpService.js';
import env from "../env.js";


const movieEndpoint = `${env.api}/api/movies`;

export function getMoviesApi() {
    return http.get(movieEndpoint);
}


export function getMovieApi() {
    return http.get(movieEndpoint);
}

export function saveMovieApi(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(`${movieEndpoint}/${movie._id}`, body)
    }
    return http.post(movieEndpoint, movie);
}


export function deleteMovieApi(movieId) {
    return http.delete(`${movieEndpoint}/${movieId}`);
}