import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/movieServices.js";


const initialMovie = {
	title: '',
	release_date: '',
	poster_path: '',
	genres: [],
	overview: '',
	homepage: ''
}

export default function MovieDetails() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(initialMovie)

	useEffect(() => {
		async function fetchMovie() {
			setMovie(await getMovieDetails(movieId));
		}

		fetchMovie()
	}, [movieId]);

	const posterPath = movie.poster_path
		? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
		: '';

	const genreNames = movie.genres.map(g => g.name).join(', ');


	return (
		<div className="container w-50">
			<h3 className="panel-title mt-5">
				{ movie.title }
			</h3>

			{posterPath && (
				<img
					src={posterPath}
					alt={movie.title}
					className="thumbnail"
					width="100%"
				/>
			)}

			<ul className="list-group">
				<li className="list-group-item">
					Genres: <span>{genreNames}</span>
				</li>

				<li className="list-group-item">
					Release Date: {movie.release_date}
				</li>

				<li className="list-group-item">
					Overview: {movie.overview}
				</li>

				<a href={movie.homepage}
					  target="_blank"
					  className="btn btn-outline-primary mt-2 mb-5"
				>
					Visit Movie Website
				</a>
			</ul>
		</div>
	);
}