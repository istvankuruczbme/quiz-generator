export default function validateNumber(number: number, prefix?: string): void {
	if (isNaN(number)) throw new Error(`${prefix || ""}-invalid`);
}
