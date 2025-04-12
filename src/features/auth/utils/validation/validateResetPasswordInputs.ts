import checkSamePassword from "./checkSamePassword";
import validatePassword from "./validatePassword";

export default function validateResetPasswordInputs(
	password: string | undefined,
	passwordConfirm: string | undefined
): void {
	validatePassword(password, "auth/");
	validatePassword(passwordConfirm, "auth/");
	checkSamePassword(password as string, passwordConfirm as string, "auth/");
}
