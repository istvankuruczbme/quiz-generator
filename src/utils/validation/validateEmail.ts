export default function validateEmail(email: string | undefined, prefix?: string): void {
	// Check if email is undefined
	if (email == undefined) throw new Error(`${prefix || ""}email-missing`);

	// Test email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) throw new Error(`${prefix || ""}email-invalid`);
}
