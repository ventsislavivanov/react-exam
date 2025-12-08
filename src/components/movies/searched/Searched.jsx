import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSearchMovie } from "../../../services/movieServices.js";
import MovieCard from "../movie-card/MovieCard.jsx";

export default function Searched() {
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(searchQuery || '');

	const [searchResults, setSearchResults] = useState([]);
	const [loading, setLoading] = useState(false);

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

			{loading && <p>Loading...</p>}

			{!loading && searchResults.length === 0 && (
				<p>No results found.</p>
			)}

			{!loading && searchResults.length > 0 && (
				<div className="row">
					{searchResults.map((movie) => (
						<div className="col-lg-2 pt-2 pb-2" key={movie.id}>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
			)}
		</div>
	);
}