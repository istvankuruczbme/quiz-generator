export default function validateName(name: string | undefined, prefix?: string): void {
	if (name == undefined || name === "") {
		throw new Error(`${prefix || ""}name-missing`);
	}
}
