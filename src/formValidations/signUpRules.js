export const makeSignUpRules = ({ getValues, egnValidate }) => {
	return {
		fullName: {
			required: 'Full name is required',
			pattern: {
				value: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
				message:
					'Field must contain two names (letters only) separated by a space. Both should start with a capital letter',
			},
		},
		email: {
			required: 'Email is required',
			minLength: { value: 8, message: 'Email must be at least 8 characters long' },
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: 'Entered value does not match email format',
			},
		},
		password: {
			required: 'Password is required',
			minLength: { value: 6, message: 'Password must be at least 6 characters long' },
			maxLength: { value: 10, message: 'Password must be at most 10 characters long' },
			pattern: {
				value: /[A-Za-z0-9]/,
				message: 'Only letters and numbers are allowed. No special characters allowed',
			},
		},
		confirmPassword: {
			required: true,
			validate: (val) => {
				const pwd = getValues('password');
				return pwd === val || 'Passwords do not match';
			},
		},
		pin: {
			required: 'EGN is required',
			validate: (val) => egnValidate(val) || 'EGN is invalid',
		},
		address: { required: 'Address is required' },
		dob: { required: 'Date of Birth is required' },
		gender: { required: 'Gender is required' },
	};
};