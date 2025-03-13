export default function checkSamePassword(
	password: string,
	passwordConfirm: string,
	prefix?: string
): void {
	if (password !== passwordConfirm) throw new Error(`${prefix || ""}passwords-dont-match`);
}
