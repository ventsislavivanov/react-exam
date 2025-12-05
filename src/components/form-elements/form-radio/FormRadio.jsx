import { useId } from 'react';

export default function FormRadio({
	name,
	options,
	register,
	formState,
	getFieldState,
	rules = {},
	label,
}) {
	const groupId = useId();
	const { errors, isSubmitted } = formState;
	const { isTouched } = getFieldState(name, formState);

	const showError = (isTouched || isSubmitted) && errors[name];

	// за criteriaMode: 'all' – извличаме всички съобщения
	const messages = Object.values(errors[name]?.types || (errors[name]?.message ? { _single: errors[name].message } : {}));

	return (
		<div className="mb-3">
			<label className="form-label" style={{ paddingLeft: 5 }}>
				{label ?? name}
			</label>
			<br />

			{options.map((option) => {
				const id = `${groupId}-${option}`;
				return (
					<div key={option} className="form-check">
						<input
							type="radio"
							id={id}
							value={option}
							// важно: едно и също име за групата
							{...register(name, rules)}
							className={[
								'form-check-input',
								showError ? 'is-invalid' : null,
							].filter(Boolean).join(' ')}
							aria-invalid={showError ? 'true' : undefined}
						/>
						<label htmlFor={id} className="form-check-label" style={{ paddingLeft: 5 }}>
							{option}
						</label>
					</div>
				);
			})}

			{showError && (
				Array.isArray(messages) && messages.length > 0 ? (
					messages.map((msg, idx) => (
						<div key={`${name}-err-${idx}`} className="invalid-feedback d-block">{msg}</div>
					))
				) : (
					<div className="invalid-feedback d-block">{errors[name]?.message}</div>
				)
			)}
		</div>
	);
}