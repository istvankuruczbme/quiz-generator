export default function getPasswordResetFlag(): boolean {
	const value = window.localStorage.getItem("passwordReset");
	return value === "true";
}
