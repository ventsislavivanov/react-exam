import { useEffect, useState } from "react";
import MovieCard from "../movie-card/MovieCard.jsx";
import {
	getBestDramaMovies,
	getInTheaterMovies,
	getKidsMovies,
	getPopularMovies,
} from "../../services/movieServices.js";

export default function Dashboard() {
	const [bestDramaMovies, setBestDramaMovies] = useState([]);
	const [popularMovies, setPopularMoviesMovies] = useState([]);
	const [kidsMovies, setKidsMovies] = useState([]);
	const [inTheaterMovies, setInTheaterMovies] = useState([]);

	useEffect(() => {
		async function fetchMovies() {
			setBestDramaMovies(await getBestDramaMovies())
			setPopularMoviesMovies(await getPopularMovies());
			setKidsMovies(await getKidsMovies());
			setInTheaterMovies(await getInTheaterMovies());
		}

		fetchMovies();
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