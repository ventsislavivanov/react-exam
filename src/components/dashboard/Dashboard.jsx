import { useEffect, useState } from "react";
import MovieCard from "../movie-card/MovieCard.jsx";
import { baseURL, apiKey } from "../../configs/api.js";

const POPULAR = 'discover/movie?sort_by=popularity.desc';
const IN_THEATER = 'discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-01-31';
const KIDS = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
const BEST_DRAMA = 'discover/movie?with_genres=18&primary_release_year=2019';

export default function Dashboard() {
	const [bestDramaMovies, setBestDramaMovies] = useState([]);
	const [popularMovies, setPopularMoviesMovies] = useState([]);
	const [kidsMovies, setKidsMovies] = useState([]);
	const [inTheaterMovies, setInTheaterMovies] = useState([]);

	useEffect(() => {
	    fetch(baseURL + POPULAR + `&${apiKey}`)
	        .then(res => res.json())
	        .then(res => {
				setPopularMoviesMovies(res.results.slice(0, 6));
	        })
			.catch(error => console.log(error));
	}, []);
	useEffect(() => {
		fetch(baseURL + IN_THEATER + `&${apiKey}`)
			.then(res => res.json())
			.then(res => {
				setInTheaterMovies(res.results.slice(0, 6));
			})
			.catch(error => console.log(error));
	}, []);
	useEffect(() => {
		fetch(baseURL + BEST_DRAMA + `&${apiKey}`)
			.then(res => res.json())
			.then(res => {
				setBestDramaMovies(res.results.slice(0, 6));
			})
			.catch(error => console.log(error));
	}, []);
	useEffect(() => {
		fetch(baseURL + KIDS + `&${apiKey}`)
			.then(res => res.json())
			.then(res => {
				setKidsMovies(res.results.slice(0, 6));
			})
			.catch(error => console.log(error));
	}, []);

	return (
		<>
			<div className="container">
				<h2 className="pt-2">Popular movies</h2>

				<div className="row">
					{popularMovies.map((movie) => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard movie={movie}/>
						</div>
					))}
				</div>

				<h2 className="pt-2">In Theater movies</h2>

				<div className="row">
					{inTheaterMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard movie={movie}/>
						</div>
					))}
				</div>

				<h2 className="pt-2">Kids movies</h2>

				<div className="row">
					{kidsMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard movie={movie}/>
						</div>
					))}
				</div>

				<h2 className="pt-2">Best drama movies</h2>

				<div className="row">
					{bestDramaMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard movie={movie}/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}