import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormInput({
	type = 'text',
	name,
	placeholder,
	rules,
	register,
	formState,
	getFieldState,
	label,
	icon = [],
	disabled,
}) {
	const { errors, isSubmitted } = formState;

	const isInvalid = (field) => {
		const { isTouched } = getFieldState(field, formState);
		return (isTouched || isSubmitted) && errors[field];
	};

	const cx = (...classes) => classes.filter(Boolean).join(' ');

	const invalidIf = (field) => isInvalid(field) && 'is-invalid';

	const fieldErrors = (field) => {
		const { isTouched } = getFieldState(field, formState);

		if (!isTouched && !isSubmitted) return [];

		const types = errors[field]?.types || {};
		return Object.entries(types).map(([key, message]) => ({
			$uid: `${field}-${key}`,
			$message: message,
		}));
	};

	return (
		<div className="form-group mb-3">
			{label && (
				<label htmlFor={name} className="control-label">{label}</label>
			)}

			<div className="input-group">
				{icon.length > 0 && (
					<span className="input-group-text">
						<FontAwesomeIcon icon={icon} />
					</span>
				)}

				<input
					type={type}
					id={name}
					placeholder={placeholder}
					{...register(name, rules)}
					className={cx('form-control', invalidIf(name))}
					disabled={disabled}
				/>
			</div>

			{fieldErrors(name).map((e) => (
				<div key={e.$uid} className="invalid-feedback d-block">{e.$message}</div>
			))}
		</div>
	);
}