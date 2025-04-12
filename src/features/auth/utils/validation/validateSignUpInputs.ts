import validateBoolean from "../../../../utils/validation/validateBoolean";
import validateEmail from "../../../../utils/validation/validateEmail";
import validateName from "../../../../utils/validation/validateName";
import checkSamePassword from "./checkSamePassword";
import validatePassword from "./validatePassword";

export default function validateSignUpInputs(
	name: string | undefined,
	email: string | undefined,
	password: string | undefined,
	passwordConfirm: string | undefined,
	privacy: boolean | undefined
): void {
	validateName(name, "auth/");
	validateEmail(email, "auth/");
	validatePassword(password, "auth/");
	validatePassword(passwordConfirm, "auth/");
	checkSamePassword(password as string, passwordConfirm as string, "auth/");
	validateBoolean(privacy, "auth/privacy-policy");
}
