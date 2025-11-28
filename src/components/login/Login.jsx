import FormFieldset from "../form-fieldset/FormFieldset.jsx";
import { Link } from "react-router";

export default function Login() {
	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle"
					 style={{ maxWidth: 400, width: "100%"}}
				>
					<h3 className="text-center mb-4">Login</h3>

					<form>
						<FormFieldset icon={['fas', 'user']}
									  label="Email"
									  name="email"
						>
							<input type="email"
								   className="form-control"
								   placeholder="Place enter email..."
							/>
						</FormFieldset>

						<FormFieldset icon={['fas', 'lock']}
									  label="Password"
									  name="password"
						>
							<input type="password"
								   className="form-control"
								   placeholder="Place enter password..."
							/>
						</FormFieldset>
						<button type="submit" className="btn btn-primary w-100">Login</button>
					</form>

					<p className="text-center mt-3">
						Don't have an account?
						<Link to={'sign-up'}>Sign up </Link>
					</p>
				</div>
			</div>
		</div>
	);
}