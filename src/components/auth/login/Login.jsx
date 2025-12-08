import { Link, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import FormInput from "../../form-elements/form-input/FormInput.jsx";
import { generationRequestToken, buildAuthUrl } from "../../../services/authServices.js";

const intialValues = {
	username: 'vivanovspam',
	password: 'eUXz5@Zn#0'
};

export default function Login() {
	const [searchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState,
		reset,
		getFieldState
	} = useForm({
		defaultValues: intialValues,
		mode: 'onTouched',
		reValidateMode: 'onChange',
		criteriaMode: 'all'
	});

	const loginHandler = async () => {
		try {
			const { request_token } = await generationRequestToken();
			const returnUrl = searchParams.get("returnUrl") || undefined;

			const authUrl = await buildAuthUrl(request_token, returnUrl);
			window.location.href = authUrl;
		} catch (err) {
			console.error(err);
		} finally {
			reset();
		}
	};

	const onInvalid = (errors) => {
		console.log(errors);
	};

	const buildFieldRules = {
		username: {
			required: 'Username is required',
			minLength: { value: 6, message: 'Username must be at least 8 characters long' }
		},
		password: {
			required: 'Password is required',
			minLength: { value: 3, message: 'Password must be at least 3 characters long' }
		}
	};

	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle"
					 style={{ maxWidth: 400, width: "100%"}}
				>
					<h3 className="text-center mb-4">Login</h3>

					<form onSubmit={handleSubmit(loginHandler, onInvalid)}>
						<FormInput
							name="username"
							rules={buildFieldRules.username}
							placeholder="Place enter username..."
							label="Username"
							icon={['fas', 'user']}
							register={register}
							formState={formState}
							getFieldState={getFieldState}
						/>

						<FormInput
							type="password"
							name="password"
							rules={buildFieldRules.password}
							placeholder="Place enter password..."
							label="Password"
							icon={['fas', 'lock']}
							register={register}
							formState={formState}
							getFieldState={getFieldState}
						/>

						<button type="submit" className="btn btn-primary w-100">Login</button>
					</form>

					<p className="text-center mt-3">
						Don't have an account? <Link to="/sign-up">Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}