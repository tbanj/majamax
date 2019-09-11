import http from './httpService.js';

import env from "../env.js";
const userEndpoint = `${env.api}/users`;

export const github_token = env.access_token;

const githubUserEndpoint = `${env.github_api_url}`;

export function register(user) {
    return http.post(userEndpoint, {
        email: user.username,
        password: user.password,
        name: user.fullname
    })
}

export async function userDatas() {
    const { data } = await http.get(githubUserEndpoint);
    console.log(data)
    return data;
}
