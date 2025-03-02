export default function validatePassword(password: string | undefined): void {
	// Check is password in undefined
	if (password == undefined) throw new Error("auth/password-missing");

	// Check length
	if (password.length < 6) throw new Error("auth/password-too-short");
}
