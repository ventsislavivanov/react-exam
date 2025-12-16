import { FormProvider, useForm } from "react-hook-form";
import FormInput from "../../form-elements/form-input/FormInput.jsx";
import FormRadio from "../../form-elements/form-radio/FormRadio.jsx";
import { validationRules as vr} from "../../../helpers/validationRules.js";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../configs/firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useEffect } from "react";
import { login } from "../../../store/authSlice.js";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const intialValues = {
	fullName: '',
	email: '',
	password: '',
	confirmPassword: '',
	pin: '',
	address: '',
	dob: ''
}
export default function SignUp() {
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
		reset,
		watch,
		setValue
	} = methods;

	const registerHandler = async (data) => {
		const { fullName, email, password, pin, address, dob } = data;

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await setDoc(doc(db, "users", user.uid), {
				fullName,
				email,
				pin,
				address,
				dob,
				createdAt: serverTimestamp(),
			});

			reset();
			dispatch(login({
				uid: user.uid,
				email: user.email,
			}));
			navigate('/');
		} catch (err) {
			alert(err.message);
		}
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
			minLength: { value: 6, message: 'Password must be at least 6 characters long' },
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
			required: 'EGN is required',
			validate: (val) => vr.egn(val) || 'Invalid EGN'
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

	const extractBirthDate = (pin) => {
		let year = pin.substring(0, 2);
		let month = pin.substring(2, 4);
		const day = pin.substring(4, 6);

		if (month >= 40 && month <= 52) {
			month = month - 40;
			year = 20 + year;
		}
		else if (month >= 20 && month <= 32) {
			month = month - 20;
			year = 18 + year;
		}
		else if (month >= 1 && month <= 12) {
			month = +month;
			year = 19 + year;
		}

		if (month <= 9)
			month = `0${month}`;

		return `${day}/${month}/${year}`;
	}

	const pinValue = watch('pin') || '';

	useEffect(() => {
		if (!pinValue || pinValue.length < 6) {
			setValue('dob', '', { shouldValidate: true, shouldDirty: true });
			return;
		}

		const dob = extractBirthDate(pinValue);
		setValue('dob', dob, { shouldValidate: true, shouldDirty: true });

	}, [pinValue, setValue]);

	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle" style={{maxWidth: 600, width: '100%'}}>
					<h3 className="text-center mb-4">
						Sign up user
					</h3>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(registerHandler, onInvalid)}>
							<div className="row">
								<div className="col-md-12">
									<FormInput
										name="fullName"
										rules={buildFieldRules.fullName}
										placeholder="Full Name"
										icon={['fas', 'user']}
									/>
								</div>

								<div className="col-md-12">
									<FormInput
										name="email"
										rules={buildFieldRules.email}
										placeholder="Email"
										icon={['fas', 'envelope']}
									/>
								</div>

								<div className="col-md-6">
									<FormInput
										type="password"
										name="password"
										rules={buildFieldRules.password}
										placeholder="Password..."
										icon={['fas', 'unlock']}
									/>
								</div>

								<div className="col-md-6">
									<FormInput
										type="password"
										name="confirmPassword"
										rules={buildFieldRules.confirmPassword}
										placeholder="Confirm password..."
										icon={['fas', 'unlock-keyhole']}
									/>
								</div>

								<div className="col-md-12">
									<FormInput
										name="pin"
										rules={buildFieldRules.pin}
										placeholder="Personal identification number (EGN)"
										icon={['fas', 'id-card']}
										inputMode="numeric"
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
											/>
										</div>

										<div className="col-md-12">
											<FormInput
												name="dob"
												rules={buildFieldRules.dob}
												placeholder="Date of Birth"
												icon={['fas', 'calendar']}
												disabled={true}
											/>
										</div>
									</div>
								</div>

								<div className="col-md-4">
									<FormRadio
										name="gender"
										rules={buildFieldRules.gender}
										label="Gender"
										options={['Male', 'Female', 'Other']}
									/>
								</div>
							</div>

							<button type="submit" className="btn btn-primary w-100">
								Register
							</button>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}