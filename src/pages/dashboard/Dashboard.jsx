import Jumbotron from "../../components/jumbotron/Jumbotron.jsx";
import MovieCard from "../../components/movie-card/MovieCard.jsx";
import Loading from "../../components/loading/Loading.jsx";
import {
	usePopularMovies,
	useInTheaterMovies,
	useKidsMovies,
	useDramaMovies
} from "../../hooks/movies";


export default function Dashboard() {
	// const dispatch = useDispatch();
	// const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

	const { data: popular = [], loading: popularLoading } = usePopularMovies();
	const { data: inTheater = [], loading: inTheaterLoading } = useInTheaterMovies();
	const { data: kids = [], loading: kidsLoading } = useKidsMovies();
	const { data: drama = [], loading: dramaLoading } = useDramaMovies();

	const moviesLoading = popularLoading || inTheaterLoading || kidsLoading || dramaLoading;

	return (
		<>
			<Jumbotron />

			<div className="container">
				{moviesLoading
					? (<Loading fullscreen={true} />)
					: (<>
						<h2 className="pt-2">Popular movies</h2>

						<div className="row">
							{popular.map((movie) => (
								<div className="col-lg-2 pb-2" key={movie.id}>
									<MovieCard
										movie={movie}
										isFavorite={true}
									/>
								</div>
							))}
						</div>

						<h2 className="pt-2">In Theater movies</h2>

						<div className="row">
							{inTheater.map(movie => (
								<div className="col-lg-2 pb-2" key={movie.id}>
									<MovieCard
										movie={movie}
										isFavorite={false}
									/>
								</div>
							))}
						</div>

						<h2 className="pt-2">Kids movies</h2>

						<div className="row">
							{kids.map(movie => (
								<div className="col-lg-2 pb-2" key={movie.id}>
									<MovieCard
										movie={movie}
										isFavorite={false}
									/>
								</div>
							))}
						</div>

						<h2 className="pt-2">Drama movies</h2>

						<div className="row">
							{drama.map(movie => (
								<div className="col-lg-2 pb-2" key={movie.id}>
									<MovieCard
										movie={movie}
										isFavorite={false}
									/>
								</div>
							))}
						</div>
					</>)
				}
			</div>
		</>
	);
}