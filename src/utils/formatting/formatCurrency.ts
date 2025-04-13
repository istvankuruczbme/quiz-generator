export default function formatCurrency(amount: number, currency = "usd"): string {
	const formatter = new Intl.NumberFormat(undefined, {
		style: "currency",
		currency,
		currencyDisplay: "narrowSymbol",
	});

	return formatter.format(amount);
}
