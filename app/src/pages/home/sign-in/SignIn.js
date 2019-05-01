import React from 'react';
import Button from "react-bootstrap/Button";
import {httpConfig} from "../../../shared/http/http-config";
import Form from "react-bootstrap/Form";
import {Formik} from "formik";
import * as Yup from "yup";
import {FormDebugger} from "../../../shared/components/FormDebugger";

export const SignIn = () => {
	const validator = Yup.object().shape({
		profileEmail: Yup.string()
			.email("profile email must be a valid email")
			.required('email is required'),
		profilePassword: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least eight characters")
	});


	//the initial values object defines what the request payload is.
	const signIn = {
		profileEmail:"",
		profilePassword:""
	};

	const submitSignIn = (values, grabBag) => {
		console.log(grabBag);
		httpConfig.post("/apis/sign-in/", values)
			.then(reply => {grabBag.setStatus(reply)});
		//console.log(status);
	};

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-sm-4">

						<Formik
							initialValues={signIn}
							onSubmit= {submitSignIn}
							validationSchema={validator}
						>
							{props => {
								const {
									status,
									values,
									errors,
									touched,
									dirty,
									isSubmitting,
									handleChange,
									handleBlur,
									handleSubmit,
									handleReset
								} = props;
								return (
									<>
										<Form onSubmit={handleSubmit}>
											<Form.Group controlId="profileEmail">
												<Form.Label>Email address</Form.Label>
												<Form.Control
													type="email"
													value={values.profileEmail}
													placeholder="Enter email"
													onChange={handleChange}
													onBlur={handleBlur}

												/>
												{
													errors.profileEmail && touched.profileEmail && (
														<div className="alert alert-danger">
															{errors.profileEmail}
														</div>)

												}
											</Form.Group>

											<Form.Group controlId="profilePassword">
												<Form.Label>Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Password"
													value={values.profilePassword}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{ errors.profilePassword && touched.profilePassword && (
													<div className="alert alert-danger">{errors.profilePassword}</div>
												)}
											</Form.Group>

											<Form.Group>
												<Button variant="primary" type="submit">Submit</Button>
												<Button
													variant="primary"
													onClick={handleReset}
													disabled={!dirty || isSubmitting}
												>Reset</Button>
											</Form.Group>
											<FormDebugger {...props} />
										</Form>
										{status && (<div className={status.type}>{status.message}</div>)}
									</>
								)
							}}
						</Formik>
					</div>
					<div className="col-sm-8">
					</div>
				</div>
			</div>
		</>
	)
};


