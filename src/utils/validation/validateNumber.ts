export default function validateNumber(number: number | undefined, prefix?: string): void {
	if (number == undefined) throw new Error(`${prefix || ""}-missing`);
	if (isNaN(number)) throw new Error(`${prefix || ""}-invalid`);
}
