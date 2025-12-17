import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import styles from './MovieCard.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteThunk, removeFavoriteThunk } from "../../store/favoritesSlice.js";

export default function MovieCard(
    {movie, isFavorite = false}
) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

	const id = movie.id ?? movie.movieId;
	const posterPath = movie.poster_path ? ('https://image.tmdb.org/t/p/w500' + movie.poster_path) : undefined;

	const { isAuthenticated, user} = useSelector((s) => s.auth);
	const uid = user?.uid;

	const toggleFavoriteHandler = () => {
		if (!isAuthenticated || !uid) return;
		if (isFavorite) {
			dispatch(removeFavoriteThunk({ uid, movieId: id }));
		} else {
			dispatch(addFavoriteThunk({ uid, movie }));
		}
	}


	return (
		<div className="card mb-3 h-100 d-flex flex-column">
			<div className={`${styles.imageContainer} border-bottom`}>
				{posterPath ? (
					<img
						src={posterPath}
						alt={movie.title}
						className={`${styles.cardImgTop} user-select-none`}
						width="100%"
						height="200"
					/>
				) : (
					<div className="d-flex align-items-center justify-content-center bg-light" style={{ height: 200 }}>
						<span className="text-muted">No image</span>
					</div>
				)}
			</div>

			<div className="card-body d-flex flex-column flex-grow-1">
				<h6 className="card-title text-center">
					{ movie.title }
				</h6>

				<p className="card-text text-center text-muted mb-4">
					{ movie.release_date }
				</p>
			</div>

			<div className="card-footer text-muted d-flex justify-content-around">
				<button
					type="button"
					className="btn btn-info"
					onClick={() => {navigate(`movie/${movie.id}/details`)}}
				>
					<FontAwesomeIcon icon={['fas', 'eye']}/>
				</button>

				{isAuthenticated && (
					<button
						type="button"
						className={`btn ${!isFavorite ? 'btn-outline-primary' : 'btn-primary'}`}
						onClick={toggleFavoriteHandler}
					>
						<FontAwesomeIcon icon={['fas', 'heart']} />
					</button>
				)}
			</div>
		</div>
	);
}