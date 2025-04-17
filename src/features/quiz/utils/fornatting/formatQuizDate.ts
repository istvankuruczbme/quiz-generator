export default function formatQuizDate(date: Date): string {
	const formatter = new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return formatter.format(date);
}
