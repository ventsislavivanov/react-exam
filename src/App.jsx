import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebase";
import { login, logout } from "./store/authSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";
import PrivateRoute from "./components/private-route/PrivateRoute.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Searched from "./pages/searched/Searched.jsx";
import MovieDetails from "./pages/movie-details/MovieDetails.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";
import ContactUs from "./pages/contact-us/ContactUs.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/sign-up/SignUp.jsx";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(login({ uid: user.uid, email: user.email }));
			} else {
				dispatch(logout());
			}
		});

		return () => unsub();
	}, [dispatch]);

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
			</Routes>

			<Footer />
		</>
	)
}

export default App
