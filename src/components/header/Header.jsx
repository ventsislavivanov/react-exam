import { Link } from "react-router";
import styles from './Header.module.css';

const links = [
	{ name: '', label: 'Movie' },
	{ name: 'favorite-movies', label: 'Favorites' },
	{ name: 'about-us', label: 'About Us' },
	{ name: 'contact-us', label: 'Contact Us' },
];

export default function Header() {
	return (
		<nav
			className={`navbar navbar-expand-lg bg-primary ${styles.navbarAnimated}`}
			data-bs-theme="dark"
		>
			<div className="container-fluid">
				<Link to=""
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
						<li className="nav-item">
							<Link to="/login" className="btn btn-outline-light btn-lg" role="button">
								Log In
							</Link>
						</li>

						<li className="nav-item">
							<button type="button" className="btn btn-outline-light btn-lg">
								Log out
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}