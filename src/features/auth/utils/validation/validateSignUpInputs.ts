import validateEmail from "../../../../utils/validation/validateEmail";
import validateName from "../../../../utils/validation/validateName";
import checkSamePassword from "./checkSamePassword";
import validatePassword from "./validatePassword";

export default function validateSignUpInputs(
	name: string | undefined,
	email: string | undefined,
	password: string | undefined,
	passwordConfirm: string | undefined
): void {
	validateName(name, "auth/");
	validateEmail(email, "auth/");
	validatePassword(password);
	validatePassword(passwordConfirm);
	checkSamePassword(password as string, passwordConfirm as string);
}
