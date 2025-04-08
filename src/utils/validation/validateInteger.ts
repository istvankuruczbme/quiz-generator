export default function validateInteger(number: number | undefined, prefix?: string): void {
	if (!Number.isInteger(number)) throw new Error(`${prefix || ""}-invalid`);
}
