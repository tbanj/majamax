import jwt_decode from 'jwt-decode';
import http from './httpService.js';
import env from "../env.js";

const authEndpoint = `${env.api}/auth`;
const tokenKey = "vidly-token";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(authEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);

}


export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);

}

export function getCurrentUser() {

    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwt_decode(jwt);

    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}
export function logout() {
    localStorage.removeItem(tokenKey);
}






