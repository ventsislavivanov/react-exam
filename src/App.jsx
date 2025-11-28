import { Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Favorites from "./components/favorites/Favorites.jsx";
import AboutUs from "./components/about-us/AboutUs.jsx";
import ContactUs from "./components/contact-us/ContactUs.jsx";
import Login from "./components/auth/login/Login.jsx";
import SignUp from "./components/auth/sign-up/SignUp.jsx";
import MovieDetails from "./components/movie-details/MovieDetails.jsx";

function App() {

	return (
		<>
			<Header/>

			<Routes>
				<Route path="/" element={<Dashboard/>}/>
				<Route path="/favorite-movies" element={<Favorites/>}/>
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
