import http from './httpService.js';
import env from "../env.js";


const genreEndpoint = `${env.api}/api/genres`;

export function getGenresApi() {
    return http.get(genreEndpoint);
}