import validateEmail from "../../../../utils/validation/validateEmail";
import checkSamePassword from "./checkSamePassword";
import validatePassword from "./validatePassword";

export default function validateResetPasswordInputs(
	email: string | undefined,
	password: string | undefined,
	passwordConfirm: string | undefined
): void {
	validateEmail(email, "auth/");
	validatePassword(password, "auth/");
	validatePassword(passwordConfirm, "auth/");
	checkSamePassword(password as string, passwordConfirm as string, "auth/");
}
