import { useEffect, useState } from "react";
import MovieCard from "../../components/movie-card/MovieCard.jsx";
import {
	getBestDramaMovies,
	getInTheaterMovies,
	getKidsMovies,
	getPopularMovies,
} from "../../services/movieServices.js";
import Jumbotron from "../../components/jumbotron/Jumbotron.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loadFavorites, selectFavorites } from "../../store/favoritesSlice.js";

export default function Dashboard() {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const isLogin = useSelector((state) => state.auth.success);
	const sessionId = useSelector((state) => state.auth.sessionId);

 	const favoritesMovies = useSelector(selectFavorites);

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
	}, [isAuthenticated, sessionId]);

    // load favorites when session becomes available
    useEffect(() => {
        if (isAuthenticated && sessionId) {
            dispatch(loadFavorites());
        }
    }, [dispatch, isAuthenticated, sessionId]);


	return (
		<>
			<Jumbotron
				title="Find the Perfect Movie for Any Mood!"
				description="Explore a world of movies at your fingertips. Search for your favorite titles or discover new ones to fall in love with. Start your journey today!"
				callToAction="Looking for the perfect movie? Our platform makes it easy to search, discover, and save your favorite films. Join now and dive into the world of cinema."
			/>

			<div className="container">
				<h2 className="pt-2">Popular movies</h2>

				<div className="row">
					{popularMovies.map((movie) => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard
								movie={movie}
								isFavorite={favoritesMovies.some(f => f.id === movie.id)}
							/>
						</div>
					))}
				</div>

				<h2 className="pt-2">In Theater movies</h2>

				<div className="row">
					{inTheaterMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard
              	movie={movie}
                isFavorite={favoritesMovies.some(f => f.id === movie.id)}
							/>
						</div>
					))}
				</div>

				<h2 className="pt-2">Kids movies</h2>

				<div className="row">
					{kidsMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard
								movie={movie}
								isFavorite={favoritesMovies.some(f => f.id === movie.id)}
							/>
						</div>
					))}
				</div>

				<h2 className="pt-2">Best drama movies</h2>

				<div className="row">
					{bestDramaMovies.map(movie => (
						<div className="col-lg-2 pb-2" key={movie.id}>
							<MovieCard
								movie={movie}
								isFavorite={favoritesMovies.some(f => f.id === movie.id)}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}