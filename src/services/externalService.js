
import http from './externalHttpService.js';
import { getGenresApi } from "./genreService.js";
export function upcomingMovies() {
    return http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${`26d590054f5f60711403f75911c12762`}&language=en-US&page=3`);
}


export async function getUpcomingMovies() {
    try {

        const { data } = await upcomingMovies();
        let genreList = await genresInfo();

        return insertGenreType(data.results, genreList);
    } catch (error) {
        if (error.response && error.response.status === 422) {
            return error.response.data.errors[0];
        }
        if (error.response && error.response.status === 404)
            return error.response.data.status_message
        if (error.response && error.response.status === 401)
            return error.response.data.status_message
    }
    console.log("server error");
}

export async function genresInfo() {
    try {
        const res = await getGenresApi();
        return res.data;
    } catch (error) {
        console.log(error);

    }
}

export function insertGenreType(data, genre) {

    if ("genre_ids" in data[0]) {
        let upcomingCompile = [];
        for (let i = 0; i < data.length; i++) {
            let foundGenre = data[i]["genre_ids"];
            let movieGenreList = [];

            for (let j = 0; j < foundGenre.length; j++) {
                for (let m = 0; m < genre.length; m++) {
                    if (genre[m].id === foundGenre[j]) {
                        movieGenreList.push(genre[m].name);
                    }
                }
            }
            const upcomingList = {
                name: data[i]["title"],
                genre: movieGenreList,
                duration: data[i]["release_date"],
                overview: data[i]["overview"],
                rated: data[i]["popularity"],
                img: `https://image.tmdb.org/t/p/w500${data[i]["poster_path"]}`,
                background_img: `https://image.tmdb.org/t/p/w1280${data[i]["backdrop_path"]}`
            }

            upcomingCompile.push(upcomingList);
        }
        return upcomingCompile;

    }
    // return res;
}