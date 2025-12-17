import MovieCard from "../../components/movie-card/MovieCard.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavorites, selectFavorites, selectFavoritesLoading } from "../../store/favoritesSlice.js";

export default function Favorites() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.user?.uid);
  const favoritesMovies = useSelector(selectFavorites);
  const loading = useSelector(selectFavoritesLoading);

  useEffect(() => {
    if (uid) {
      dispatch(loadFavorites(uid));
    }
  }, [dispatch, uid]);

  return (
    <div className="container">
      <h2 className="pt-2">Favorite movies</h2>

			<div className="row">
				{loading && <Loading fullscreen={true} />}

				{!loading && favoritesMovies.length === 0 && (
					<p>No results found.</p>
				)}

        {!loading && favoritesMovies.length > 0 && favoritesMovies.map((movie) => (
          <div className="col-lg-2 pt-2 pb-2" key={movie.movieId ?? movie.id}>
            <MovieCard movie={movie} isFavorite={true} />
          </div>
        ))}
      </div>
    </div>
  );
}