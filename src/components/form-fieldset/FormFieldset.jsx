import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FormFieldset({
	label,
	name,
	errors = [],
	icon = [],
	disabled,
	children
}) {
	return (
		<fieldset disabled={disabled} className="form-group mb-3">
			{label && (
				<label htmlFor={name} className="control-label">
					{label}
				</label>
			)}

			<div className="input-group">
				{icon.length > 0 && (
					<span className="input-group-text">
					<FontAwesomeIcon icon={icon}/>
					</span>
				)}

				{children}

				{errors.length > 0 && errors.map((error) => (
					<div key={error.$uid} className="invalid-feedback d-block">
						{error.$message}
					</div>
				))}

				{/*<div className="valid-feedback d-block">
					Success! You've done it.
				</div>*/}
			</div>
		</fieldset>
	);
}