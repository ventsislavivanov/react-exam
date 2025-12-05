import axios from 'axios';

const axiosTheMovieDb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export default axiosTheMovieDb;
