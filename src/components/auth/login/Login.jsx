import FormFieldset from "../../form-elements/fieldset/FormFieldset.jsx";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import FormInput from "../../form-elements/form-input/FormInput.jsx";

const intialValues = { email: '', password: '' }

export default function Login() {
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
	const { errors, isSubmitted } = formState;

	const loginHandler = (data) => {
		console.log(data);
		reset();
	}

	const onInvalid = (errors) => {
		console.log(errors);
	}

	const fieldErrors = (field) => {
		const { isTouched } = getFieldState(field, formState);
		if (!isTouched && !isSubmitted) {
			return [];
		}

		const types = errors[field]?.types || {};
		return Object.entries(types).map(([key, message]) => ({
			$uid: `${field}-${key}`,
			$message: message,
		}));
	};

	const buildFieldRules = {
		email: {
			required: 'Email is required',
			minLength: { value: 6, message: 'Email must be at least 8 characters long' },
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "Entered value does not match email format",
			}
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
						<FormFieldset icon={['fas', 'user']}
									  label="Email"
									  id="email"
									  errors={fieldErrors('email')}
						>
							<FormInput
								name="email"
								placeholder="Place enter email..."
								rules={buildFieldRules.email}
								register={register}
								formState={formState}
								getFieldState={getFieldState}
							/>

						</FormFieldset>

						<FormFieldset icon={['fas', 'lock']}
									  label="Password"
									  id="password"
									  errors={fieldErrors('password')}
						>
							<FormInput
								type="password"
								name="password"
								placeholder="Place enter password..."
								rules={buildFieldRules.password}
								register={register}
								formState={formState}
								getFieldState={getFieldState}
							/>
						</FormFieldset>

						<button type="submit"
								className="btn btn-primary w-100"
						>Login</button>
					</form>

					<p className="text-center mt-3">
						Don't have an account?
						<Link to="/sign-up">Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}