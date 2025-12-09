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

function App() {

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
