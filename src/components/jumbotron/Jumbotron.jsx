import FormInput from "../form-elements/form-input/FormInput.jsx";
import { FormProvider, useForm } from "react-hook-form";
import styles from './Jumbotron.module.css';
import { useNavigate } from "react-router";

const intialValues = { searchQuery: ''};

export default function Jumbotron({
	title,
	description,
	callToAction
}) {
	const navigate = useNavigate();

	const methods = useForm({
		defaultValues: intialValues,
		mode: 'onChange',
		reValidateMode: 'onChange',
		criteriaMode: 'all'
	});

	const {
		handleSubmit,
		reset,
	} = methods;

	const { isValid } = methods.formState;

	const searchHandler = () => {
		try {
			const encoded = encodeURIComponent(methods.getValues().searchQuery || '');
			navigate(`/movies/${encoded}/searched`);
		}
		catch (err) {
			console.error(err);
		}
		finally {
			reset();
		}
	};
	const onInvalid = (errors) => {
		console.log(errors);
	};

	const buildFieldRules = {
		searchQuery: {
			required: true,
			minLength: { value: 3, message: 'Search must be at least 3 characters long' }
		},
	};

	return (
		<div className={`${styles.jumbotron}`}>
			<div className={`${styles.overlay}`}></div>
			<div className="container">
				<div className={`p-5 ${styles.content}`}>
					<h1 className="display-4 text-light">{ title }</h1>

					<p className="lead text-center">{ description }</p>

					<hr className="my-4" />

					<p className="text-center">{ callToAction }</p>


					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(searchHandler, onInvalid)}>
							<div className="row">
								<div className="col-sm-10">
									<FormInput
										type="search"
										name="searchQuery"
										rules={buildFieldRules.searchQuery}
										placeholder="Search..."
										icon={['fas', 'search']}
										showErrors={false}
									/>
								</div>

								<div className="col-sm-2">
									<button type="submit"
											className="btn btn-light"
											disabled={!isValid}
									>Search</button>
								</div>
							</div>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
}