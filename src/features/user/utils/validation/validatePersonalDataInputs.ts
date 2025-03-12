import validateEmail from "../../../../utils/validation/validateEmail";
import validateName from "../../../../utils/validation/validateName";

export default function validatePersonalDataInputs(
	name: string | undefined,
	email: string | undefined
): void {
	validateName(name, "user/");
	validateEmail(email, "user/");
}
