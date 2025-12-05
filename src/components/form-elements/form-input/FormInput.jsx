export default function FormInput({
	type = 'text',
	name,
	placeholder,
	rules,
	register,
	formState,
	getFieldState
}) {
	const { errors, isSubmitted } = formState;

	const isInvalid = (field) => {
		const { isTouched } = getFieldState(field, formState);
		return (isTouched || isSubmitted) && errors[field];
	};

	const cx = (...classes) => classes.filter(Boolean).join(' ');

	const invalidIf = (field) => isInvalid(field) && 'is-invalid';

	return (
		<input
			type={type}
			id={name}
			placeholder={placeholder}
			{...register(name, rules)}
			className={cx('form-control', invalidIf(name))}
		/>
	);
}