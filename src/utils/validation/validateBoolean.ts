export default function validateBoolean(boolean: boolean | undefined, prefix?: string): void {
	if (boolean == undefined) throw new Error(`${prefix || ""}-invalid`);
}
