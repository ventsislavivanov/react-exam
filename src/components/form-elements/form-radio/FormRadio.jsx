import { useId } from 'react';
import { useFormContext } from "react-hook-form";

export default function FormRadio({
	name,
	options,
	rules = {},
	label,
}) {
	const groupId = useId();
	const { register, formState, getFieldState } = useFormContext();
	const { errors, isSubmitted } = formState;
	const { isTouched } = getFieldState(name, formState);

	const showError = (isTouched || isSubmitted) && errors[name];

	const messages = Object.values(
		errors[name]?.types ||
		(errors[name]?.message ? { _single: errors[name].message } : {})
	);

	return (
		<div className="form-group mb-3">
			<label className="form-label" style={{ paddingLeft: 5 }}>
				{label}
			</label>
			<br />

			{options.map((option, idx) => {
				const id = `${groupId}-${option}`;
				const regProps = idx === 0 ? register(name, rules) : register(name)

				return (
					<div key={option} className="form-check">
						<input
							type="radio"
							id={id}
							value={option}
							name={name}
							{...regProps}
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