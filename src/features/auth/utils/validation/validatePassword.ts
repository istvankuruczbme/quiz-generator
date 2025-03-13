export default function validatePassword(password: string | undefined, prefix?: string): void {
	// Check is password in undefined
	if (password == undefined) throw new Error(`${prefix || ""}password-missing`);

	// Check length
	if (password.length < 6) throw new Error(`${prefix || ""}password-too-short`);
}
