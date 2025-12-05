// import { validationRules } from "../../../helpers/validationRules.js";
import FormRadio from "../../form-elements/form-radio/FormRadio.jsx";
import { useForm } from "react-hook-form";
import FormInput from "../../form-elements/form-input/FormInput.jsx";

const intialValues = {
	fullName: '',
	email: '',
	password: '',
	confirmPassword: '',
	pin: '',
	phoneCode: '+359',
	phone: '',
	address: '',
	dob: ''
}
export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState,
		reset,
		getFieldState,
		watch,
	} = useForm({
		defaultValues: intialValues,
		mode: 'onTouched',
		reValidateMode: 'onChange',
		criteriaMode: 'all'
	});

	const registerHandler = () => {
		console.log('in')
		reset();
	}

	const onInvalid = (errors) => {
		console.log(errors);
	}

	const buildFieldRules = {
		fullName: {required: 'Full name is required',
			pattern: {
				value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
				message: "Field must contain two names (letters only) separated by a space. Both should start with a capital letter"
			}
		},
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
			minLength: { value: 3, message: 'Password must be at least 3 characters long' },
			maxLength: { value: 10, message: 'Password must be at most 10 characters long' },
			pattern: {
				value: /[A-Za-z0-9]/,
				message: 'Only letters and numbers are allowed. No special characters allowed',
			}
		},
		confirmPassword: {
			required: true,
			validate: (val =>  {
				if (watch('password') !== val) {
					return 'Passwords do not match';
				}
			})
		},
		pin: {
			required: 'Phone number is required',
			pattern: {
				value: /^\d{9}$/,
				message: 'Invalid phone number'
			},
		},
		address: {
			required: 'Address is required'
		},
		dob: {
			required: 'Date of Birth is required'
		},
		gender: {
			required: 'Gender is required'
		},
	}

	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle" style={{maxWidth: 600, width: '100%'}}>
					<h3 className="text-center mb-4">
						Sign up user
					</h3>

					<form onSubmit={handleSubmit(registerHandler, onInvalid)}>
						<div className="row">
							<div className="col-md-12">
								<FormInput
									name="fullName"
									rules={buildFieldRules.fullName}
									placeholder="Full Name"
									icon={['fas', 'user']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>

							<div className="col-md-12">
								<FormInput
									name="email"
									rules={buildFieldRules.email}
									placeholder="Email"
									icon={['fas', 'envelope']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>

							<div className="col-md-6">
								<FormInput
									type="password"
									name="password"
									rules={buildFieldRules.password}
									placeholder="Password..."
									icon={['fas', 'unlock']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>

							<div className="col-md-6">
								<FormInput
									type="password"
									name="confirmPassword"
									rules={buildFieldRules.confirmPassword}
									placeholder="Confirm password..."
									icon={['fas', 'unlock-keyhole']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>

							<div className="col-md-12">
								<FormInput
									name="pin"
									rules={buildFieldRules.pin}
									placeholder="Personal identification number (EGN)"
									icon={['fas', 'id-card']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<FormInput
											name="address"
											rules={buildFieldRules.address}
											placeholder="Address"
											icon={['fas', 'location-pin']}
											register={register}
											formState={formState}
											getFieldState={getFieldState}
									/>
									</div>

									<div className="col-md-12">
										<FormInput
											name="dob"
											rules={buildFieldRules.dob}
											placeholder="Date of Birth"
											icon={['fas', 'calendar']}
											register={register}
											formState={formState}
											getFieldState={getFieldState}
										/>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<FormRadio
									name="gender"
									rules={buildFieldRules.gender}
									options={['Male', 'Female', 'Other']}
									register={register}
									formState={formState}
									getFieldState={getFieldState}
								/>
							</div>
						</div>

						<button type="submit" className="btn btn-primary w-100">
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}