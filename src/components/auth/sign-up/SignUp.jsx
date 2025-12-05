// import { validationRules } from "../../../helpers/validationRules.js";
import FormFieldset from "../../form-elements/fieldset/FormFieldset.jsx";
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

	const { errors, isSubmitted } = formState;

	const registerHandler = () => {
		console.log('in')
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

	const isInvalid = (field) => {
		const { isTouched } = getFieldState(field, formState);
		return (isTouched || isSubmitted) && errors[field];
	};

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
								<FormFieldset
									icon={['fas', 'user']}
									id="fullName"
									errors={fieldErrors('fullName')}
								>
									<FormInput
										name="fullName"
										placeholder="Full Name"
										rules={{
											required: 'Full name is required',
											pattern: {
												value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
												message: "Field must contain two names (letters only) separated by a space. Both should start with a capital letter",
											}
										}}
										register={register}
										formState={formState}
										getFieldState={getFieldState}
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'envelope']}
									id="email"
									errors={fieldErrors('email')}
								>

									<input type="email"
										   {...register('email', {
											   required: 'Email is required',
											   minLength: { value: 6, message: 'Email must be at least 8 characters long' },
											   pattern: {
												   value: /\S+@\S+\.\S+/,
												   message: "Entered value does not match email format",
											   },
										   })}
										   id="email"
										   className={[
											   'form-control',
											   isInvalid('email') ? 'is-invalid' : null,
										   ].filter(Boolean).join(' ')}
										   placeholder="Email"
									/>
								</FormFieldset>
							</div>

							<div className="col-md-6">
								<FormFieldset
									icon={['fas', 'unlock']}
									id="password"
									errors={fieldErrors('password')}
								>
									<input type="password"
										   {...register('password', {
											   required: 'Password is required',
											   minLength: { value: 3, message: 'Password must be at least 3 characters long' },
											   maxLength: { value: 10, message: 'Password must be at most 10 characters long' },
											   pattern: {
												   value: /[A-Za-z0-9]/,
												   message: 'Only letters and numbers are allowed. No special characters allowed',
											   },

										   })}
										   id="password"
										  className={[
											   'form-control',
											   isInvalid('password') ? 'is-invalid' : null,
										   ].filter(Boolean).join(' ')}
										   placeholder="Password..."
									/>
								</FormFieldset>
							</div>

							<div className="col-md-6">
								<FormFieldset
									icon={['fas', 'unlock-keyhole']}
									id="confirmPassword"
									errors={fieldErrors('confirmPassword')}
								>
									<input type="password"
										   {...register('confirmPassword', {
											   required: true,
											   validate: (val =>  {
												   if (watch('password') !== val) {
													   return 'Passwords do not match';
												   }
											   })
										   })}
										   id="confirmPassword"
										  className={[
											   'form-control',
											   isInvalid('confirmPassword') ? 'is-invalid' : null,
										   ].filter(Boolean).join(' ')}
										   placeholder="Confirm password..."
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'id-card']}
									id="pin"
									errors={fieldErrors('pin')}
								>
									<input type="text"
										   {...register('pin', {
											   required: 'Personal identification number (EGN) is required',
											   pattern: {
												   value: /^\d{10}$/,
												   message: 'Invalid egn',
											   },
										   })}
										   id="pin"
										   className="form-control"
										   placeholder="Personal identification number (EGN)"
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'phone-volume']}
									id="phone"
									errors={fieldErrors('phone')}
								>
									<select
										{...register('phoneCode')}
										className="form-select"
										style={{ maxWidth: 120 }}
									>
										<option value="+359">+359</option>
										<option value="+971">+971</option>
										<option value="+972">+972</option>
										<option value="+198">+198</option>
										<option value="+701">+701</option>
									</select>

									<input type="text"
										   {...register('phone', {
											   required: 'Phone number is required',
											   pattern: {
												   value: /^\d{9}$/,
												   message: 'Invalid phone number',
											   },
										   })}
										   id="phone"
										   placeholder="Phone number"
										   className={[
											   'form-control',
											   isInvalid('phone') ? 'is-invalid' : null,
										   ].filter(Boolean).join(' ')}
									/>
								</FormFieldset>
							</div>
						</div>

						<div className="row">
							<div className="col-md-8">
								<div className="row">
									<div className="col-md-12">
										<FormFieldset
											icon={['fas', 'location-pin']}
											id="address"
											errors={fieldErrors('address')}
										>
											<input type="text"
												   {...register('address', {
													   required: 'Address is required',
												   })}
												   id="address"
												   className={[
													   'form-control',
													   isInvalid('address') ? 'is-invalid' : null,
												   ].filter(Boolean).join(' ')}
												   placeholder="Address"
											/>
										</FormFieldset>
									</div>

									<div className="col-md-12">
										<FormFieldset
											disabled={true}
											icon={['fas', 'calendar']}
											id="dob"
											errors={fieldErrors('dob')}
										>
											<input type="text"
												   {...register('dob', {
													   required: 'Date of Birth is required',
												   })}
												   id="dob"
												   className={[
													   'form-control',
													   isInvalid('dob') ? 'is-invalid' : null,
												   ].filter(Boolean).join(' ')}
												   placeholder="Date of Birth"
											/>
										</FormFieldset>
									</div>
								</div>
							</div>

							<div className="col-md-4">
								<FormRadio
									name="Gender"
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