export default function convertNumberToInputValue(number: number | undefined | null): string {
	if (number == undefined || isNaN(number)) return "";
	return number.toString();
}
