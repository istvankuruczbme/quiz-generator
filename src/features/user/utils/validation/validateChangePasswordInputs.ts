import checkSamePassword from "../../../auth/utils/validation/checkSamePassword";
import validatePassword from "../../../auth/utils/validation/validatePassword";

export default function validateChangePasswordInputs(
	password: string | undefined,
	passwordConfirm: string | undefined
): void {
	validatePassword(password, "auth/");
	validatePassword(passwordConfirm, "auth/");
	checkSamePassword(password as string, passwordConfirm as string, "auth/");
}
