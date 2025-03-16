import validateEmail from "../../../../utils/validation/validateEmail";
import validatePassword from "./validatePassword";

export default function validateSignInInputs(
	email: string | undefined,
	password: string | undefined
): void {
	validateEmail(email, "auth/");
	validatePassword(password, "auth/");
}
