import validateName from "../../../../utils/validation/validateName";

export default function validatePersonalDataInputs(name: string | undefined): void {
	validateName(name, "user/");
}
