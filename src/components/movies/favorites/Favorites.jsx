import MovieCard from "../movie-card/MovieCard.jsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadFavoriteMovie } from "../../../services/accountServices.js";

export default function Favorites() {
	const [favoritesMovies, setFavoritesMovies] = useState([]);
	const [loading, setLoading] = useState(false);

	const sessionId = useSelector((state) => state.auth.sessionId);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				setFavoritesMovies(await loadFavoriteMovie(sessionId) || []);
			}
			catch (e) {
				console.error(e);
			}
			finally {
				setLoading(false);
			}
		})();
	}, [sessionId]);

	return (
		<div className="container">
			<h2 className="pt-2">Favorite movies</h2>

			<div className="row">
				{loading && <p>Loading...</p>}

				{!loading && favoritesMovies.length === 0 && (
					<p>No results found.</p>
				)}

				{!loading && favoritesMovies.length > 0 && favoritesMovies.map((movie) => (
					<div className="col-lg-2 pt-2 pb-2" key={movie.id}>
						<MovieCard movie={movie} />
					</div>
				))}
			</div>
		</div>
	);
}