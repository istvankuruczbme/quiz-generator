export default function setPasswordResetFlag(): void {
	window.localStorage.setItem("passwordReset", "true");
}
