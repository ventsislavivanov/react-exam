import axiosTheMovieDb from "../configs/axios.js";
import { apiKey } from "../configs/api.js";

export async function getPopularMovies() {
  try {
    const response = await axiosTheMovieDb.get(`discover/movie?sort_by=popularity.desc&${apiKey}`);
    return response.data.results.slice(0, 6);
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getInTheaterMovies() {
  try {
    const response = await axiosTheMovieDb.get(`discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31&${apiKey}`);
    return response.data.results.slice(0, 6);
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getKidsMovies() {
  try {
    const response = await axiosTheMovieDb.get(`discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${apiKey}`);
    return response.data.results.slice(0, 6);
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getBestDramaMovies() {
  try {
    const response = await axiosTheMovieDb.get(`discover/movie?with_genres=18&primary_release_year=2019&${apiKey}`);
    return response.data.results.slice(0, 6);
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getMovieDetails(id) {
  try {
    const response = await axiosTheMovieDb.get(`movie/${id}?${apiKey}`);
    return response.data;
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}

export async function getSearchMovie(query) {
  try {
    const response = await axiosTheMovieDb.get(`search/movie?${apiKey}&query=${query}`);
    return response.data.results;
  }
  catch (e) {
    console.error('Oops unexpected', e);
    return [];
  }
}
