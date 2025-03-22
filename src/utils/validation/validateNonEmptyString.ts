export default function validateNonEmptyString(string: string | undefined, prefix?: string): void {
	if (string == undefined || string === "") throw new Error(`${prefix || ""}missing`);
}
