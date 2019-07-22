import http from './httpService.js';
import env from "../env.js";


const userEndpoint = `${env.api}/api/users`;

export function register(user) {
    return http.post(userEndpoint, {
        email: user.username,
        password: user.password,
        name: user.fullname
    })
}