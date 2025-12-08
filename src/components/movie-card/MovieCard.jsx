import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import styles from './MovieCard.module.css';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_RESOLUTION = 'w500';
export default function MovieCard({
	movie
}) {
	const navigate = useNavigate();

	const posterPath = BASE_IMAGE_URL + IMAGE_RESOLUTION + movie.poster_path;


	//    isFavorite() {
	//       return this.favoritesStore.isFavorite(this.movie.id);
	//     },
	//     loginStatus() {
	//       return this.authsStore.success;
	//     },

	return (
		<div className="card mb-3 h-100 d-flex flex-column">
			<div className={`${styles.imageContainer} border-bottom`}>
				<img
					src={posterPath}
					alt="movie.title"
					className={`${styles.cardImgTop} user-select-none`}
					width="100%"
					height="200"
				/>
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

				{/*{loginStatus && (
					<button
						type="button"
						className={`btn ${!isFavorite ? 'btn-outline-primary' : 'btn-primary'}`}
						onClick="addFavorite"
					>
						<font-awesome-icon icon="['fas', 'heart']" />
					</button>
				)}*/}
			</div>
		</div>
	);
}