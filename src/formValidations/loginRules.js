export const loginRules = {
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
	},
};