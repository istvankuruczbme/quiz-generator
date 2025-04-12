export default function removePasswordResetFlag(): void {
	window.localStorage.removeItem("passwordReset");
}
