import { FC, FormEvent, HTMLAttributes, useRef } from "react";
// Functions
import validateEmail from "../../../../utils/validation/validateEmail";
import updateAuthEmail from "../../../auth/services/updateAuthEmail";
// CSS
import "./ChangeEmail.css";

type ChangeEmailProps = HTMLAttributes<HTMLDivElement>;

const ChangeEmail: FC<ChangeEmailProps> = () => {
	// #region Refs
	const emailRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	async function handleNewEmailSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Input value
		const email = emailRef.current?.value;

		try {
			// Validate the email
			validateEmail(email);
		} catch (err) {
			console.log("Error vaidating the email.", err);
		}

		try {
			// Send confirmation email
			await updateAuthEmail(email as string);
		} catch (err) {
			console.log("Error sending confirmation email.", err);
		}
	}
	// #endregion

	return (
		<div>
			<h2>Change email</h2>

			<p>
				Type your new email address. After you hit submit a confirmation email will be sent to
				your inbox.
			</p>

			<form onSubmit={handleNewEmailSubmit}>
				<label htmlFor="changeEmail">Email:</label>
				<input type="email" id="changeEmail" placeholder="Email" required ref={emailRef} />
				<br />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ChangeEmail;
