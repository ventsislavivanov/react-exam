export default function FormRadio({
	name,
	options
}) {
	const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

	return (
		<div className="mb-3">
			<label style={{paddingLeft: 5}}
				   htmlFor="gender"
				   className="form-label"
			>
				{capitalizeFirstLetter(name)}
			</label>
			<br/>

			{options.map(option => (
				<div key={option}>
					<input type="radio"
						   id={option}
						   name={name}
							value={option}
							className="form-check-input"
					/>

					<label style={{paddingLeft: 5}}
						   htmlFor="option"
						   className="form-check-label"
					>
						{capitalizeFirstLetter(option)}
					</label>
					<br/>
				</div>
			))}

		</div>
	);
}