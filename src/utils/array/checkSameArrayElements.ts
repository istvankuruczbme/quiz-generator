export default function checkSameArrayElements<T>(array1: T[], array2: T[]): boolean {
	// Different length
	if (array1.length !== array2.length) return false;

	// Sort arrays
	const array1Sorted = [...array1].sort();
	const array2Sorted = [...array2].sort();

	// Check same elements
	return array1Sorted.every((value, index) => value === array2Sorted[index]);
}
