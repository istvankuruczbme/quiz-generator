export default function checkSamePassword(password: string, passwordConfirm: string): void {
	if (password !== passwordConfirm) throw new Error("auth/passwords-dont-match");
}
