export default function getNewUserFlag(): boolean {
	const value = window.localStorage.getItem("isNewUser");
	return value === "true";
}
