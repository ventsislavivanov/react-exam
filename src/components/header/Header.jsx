import { Link, useNavigate } from "react-router";
import styles from './Header.module.css';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice.js";
import { logoutFirebase } from "../../services/authServices.js";

const links = [
	{ name: '', label: 'Movie' },
	{ name: 'favorite-movies', label: 'Favorites' },
	{ name: 'about-us', label: 'About Us' },
	{ name: 'contact-us', label: 'Contact Us' },
];

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
	const userEmail = useSelector((s) => s.auth.user?.email);

	const logoutHandle = async () => {
		try {
			await logoutFirebase();
			dispatch(logout());
			navigate('/login');
		} catch (err) {
			alert(err.message);
		}
	};

	return (
		<nav
			className={`navbar navbar-expand-lg bg-primary ${styles.navbarAnimated}`}
			data-bs-theme="dark"
		>
			<div className="container-fluid">
				<Link to="/"
					  className="navbar-brand"
				>Movie finder</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div id="navbarColor01" className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto">
						{links.map((link) => (
							<li key={link.name} className="nav-item">
								<Link to={link.name} className="nav-link">{link.label}</Link>
							</li>
						))}
					</ul>

					<ul className="navbar-nav">
						{isAuthenticated
							? (
								<div className="align-items-center d-flex">
									<strong className="navbar-text p-1">{userEmail}</strong>
									<button type="button" className="btn btn-outline-light btn-lg" onClick={logoutHandle}>Log out</button>
								</div>
							)
							: (
								<>
									<Link to="/login" className="btn btn-outline-light btn-lg m-1" role="button">Log In</Link>

									<Link to="/sign-up" className="btn btn-outline-light btn-lg m-1" role="button">Sign up</Link>
								</>
							)
						}
					</ul>
				</div>
			</div>
		</nav>
	);
}