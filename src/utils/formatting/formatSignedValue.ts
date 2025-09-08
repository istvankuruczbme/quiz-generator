export default function formatSignedValue(number: number): string {
	if (number > 0) return `+${number}`;
	if (number < 0) return `-${number}`;
	return number.toString();
}
