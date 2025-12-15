import { Link, useNavigate } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../form-elements/form-input/FormInput.jsx";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../configs/firebase.js";
import { login } from "../../../store/authSlice.js";
import { useDispatch } from "react-redux";

const intialValues = {
	email: '',
	password: ''
};

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const methods = useForm({
		defaultValues: intialValues,
		mode: 'onTouched',
		reValidateMode: 'onChange',
		criteriaMode: 'all'
	});

	const {
		handleSubmit,
		reset
	} = methods;

	const loginHandler = async (data) => {
		const { email, password } = data;
		try {
			await signInWithEmailAndPassword(auth, email, password);

			reset();
			dispatch(login({ email }));
			navigate('/');
		} catch (err) {
			alert(err.message)
		}
	};

	const onInvalid = (errors) => {
		console.log(errors);
	};

	const buildFieldRules = {
		email: {
			required: 'Email is required',
			minLength: { value: 6, message: 'Email must be at least 8 characters long' },
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "Entered value does not match email format"
			},
		},
		password: {
			required: 'Password is required',
			minLength: { value: 6, message: 'Password must be at least 6 characters long' }
		}
	};

	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle"
					 style={{ maxWidth: 400, width: "100%"}}
				>
					<h3 className="text-center mb-4">Login</h3>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(loginHandler, onInvalid)}>
							<FormInput
								name="email"
								rules={buildFieldRules.username}
								placeholder="Place enter email..."
								label="Email"
								icon={['fas', 'user']}
							/>

							<FormInput
								type="password"
								name="password"
								rules={buildFieldRules.password}
								placeholder="Place enter password..."
								label="Password"
								icon={['fas', 'lock']}
							/>

							<button type="submit" className="btn btn-primary w-100">Login</button>
						</form>
					</FormProvider>

					<p className="text-center mt-3">
						Don't have an account? <Link to="/sign-up">Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}