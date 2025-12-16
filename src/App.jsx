import { Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/movies/dashboard/Dashboard.jsx";
import Favorites from "./components/movies/favorites/Favorites.jsx";
import AboutUs from "./components/about-us/AboutUs.jsx";
import ContactUs from "./components/contact-us/ContactUs.jsx";
import Login from "./components/auth/login/Login.jsx";
import SignUp from "./components/auth/sign-up/SignUp.jsx";
import MovieDetails from "./components/movies/movie-details/MovieDetails.jsx";
import Approved from "./components/auth/approved/Approved.jsx";
import Searched from "./components/movies/searched/Searched.jsx";
import PrivateRoute from "./components/private-route/PrivateRoute.jsx";

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './configs/firebase';
import { login, logout } from './store/authSlice';

function App() {
	const dispatch = useDispatch();
	const [bootstrapped, setBootstrapped] = useState(false);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(login({ uid: user.uid, email: user.email }));
			} else {
				dispatch(logout());
			}
			setBootstrapped(true);
		});
		return () => unsub();
	}, [dispatch]);

	if (!bootstrapped) return <div className="container">Loading...</div>;

	return (
		<>
			<Header/>

			<Routes>
				<Route path="/" element={<Dashboard/>}/>
				<Route path="/favorite-movies" element={
					<PrivateRoute>
						<Favorites/>
					</PrivateRoute>
				}/>
				<Route path="/movies/:searchQuery/searched" element={<Searched/>}/>
				<Route path="/movie/:movieId/details" element={<MovieDetails/>}/>
				<Route path="/about-us" element={<AboutUs/>}/>
				<Route path="/contact-us" element={<ContactUs/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/sign-up" element={<SignUp/>}/>
				<Route path="/approved" element={<Approved/>}/>
			</Routes>

			<Footer />
		</>
	)
}

export default App
