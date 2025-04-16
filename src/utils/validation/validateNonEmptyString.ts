export default function validateNonEmptyString(string: string | undefined, prefix?: string): void {
	if (string == undefined || string.trim() === "") throw new Error(`${prefix || ""}missing`);
}
