// import { validationRules } from "../../../helpers/validationRules.js";
import FormFieldset from "../../form-elements/fieldset/FormFieldset.jsx";
import FormRadio from "../../form-elements/form-radio/FormRadio.jsx";

export default function SignUp() {
	const registerHandler = () => {
		console.log('in')
	}

	return (
		<div className="container">
			<div className="container vh-100 d-flex justify-content-center align-items-center">
				<div className="card shadow-sm p-4 bg-dark-subtle" style={{maxWidth: 600, width: '100%'}}>
					<h3 className="text-center mb-4">
						Sign up user
					</h3>

					<form action={registerHandler}>
						<div className="row">
							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'user']}
									name="fullName"
								>
									<input type="text"
										   name="formData.fullName"
										   placeholder="Full Name"
										   className="form-control"
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'envelope']}
									name="email"
								>

									<input type="email"
										   name="formData.email"
										   className="form-control"
										   placeholder="Email"
									/>
								</FormFieldset>
							</div>

							<div className="col-md-6">
								<FormFieldset
									icon={['fas', 'unlock']}
									name="password"
								>
									<input type="password"
										   name="password"
										   className="form-control"
										   placeholder="Password..."
									/>
								</FormFieldset>
							</div>

							<div className="col-md-6">
								<FormFieldset
									icon={['fas', 'unlock-keyhole']}
									name="confirmPassword"
								>
									<input type="password"
										   name="confirmPassword"
										   className="form-control"
										   placeholder="Confirm password..."
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'id-card']}
									name="pin"
								>
									<input type="text"
										   name="formData.pin"
										   className="form-control"
										   placeholder="Personal identification number (EGN)"
									/>
								</FormFieldset>
							</div>

							<div className="col-md-12">
								<FormFieldset
									icon={['fas', 'phone-volume']}
									name="phone"
								>
									<select className="form-select" style={{ maxWidth: 120 }}>
										<option value="+359">+359</option>
										<option value="+971">+971</option>
										<option value="+972">+972</option>
										<option value="+198">+198</option>
										<option value="+701">+701</option>
									</select>

									<input type="text"
										   name="formData.phone"
										   placeholder="Phone number"
										   className="form-control"
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
											name="address"
										>
											<input type="text"
												   name="address"
												   className="form-control"
												   placeholder="Address"
											/>
										</FormFieldset>
									</div>

									<div className="col-md-12">
										<FormFieldset
											disabled={true}
											icon={['fas', 'calendar']}
											name="dob"
										>
											<input type="text"
												   name="formData.dob"
												   className="form-control"
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