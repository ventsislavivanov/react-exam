import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSearchMovie } from "../../services/movieServices.js";
import MovieCard from "../../components/movie-card/MovieCard.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../store/favoritesSlice";

export default function Searched() {
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(searchQuery || '');

	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const favorites = useSelector(selectFavorites);
	const favoriteIds = new Set(favorites.map(f => Number(f.movieId)));

	useEffect(() => {
		let isMounted = true;
		(async () => {
			try {
				setLoading(true);
				const results = await getSearchMovie(decodedQuery);
				if (isMounted) setSearchResults(results || []);
			}
			catch (e) {
				console.error(e);
				if (isMounted) setSearchResults([]);
			}
			finally {
				if (isMounted) setLoading(false);
			}
		})();

		return () => { isMounted = false; };
	}, [decodedQuery]);

	return(
		<div className="container">
			<h2 className="pt-2">
				Results for: {decodedQuery}
			</h2>

			{loading && <Loading fullscreen={true} />}

			{!loading && searchResults.length === 0 && (
				<p>No results found.</p>
			)}

			{!loading && searchResults.length > 0 && (
				<div className="row">
					{searchResults.map((movie) => (
						<div className="col-lg-2 pt-2 pb-2" key={movie.id}>
							<MovieCard
								movie={movie}
								isFavorite={favoriteIds.has(Number(movie.id))}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}