import http from './httpService.js';
import env from "../env.js";

const authEndpoint = `${env.api}/api/auth`;

export function login(email, password) {
    return http.post(authEndpoint, { email, password });
}
