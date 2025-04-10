export default function validateTextFile(file: File | undefined, prefix?: string): void {
	if (file == undefined) throw new Error(`${prefix || ""}-missing`);

	// Check files without type
	if (file.type === "") {
		// Get type from filename
		const type = file.name.split(".").at(-1)?.toLocaleLowerCase();

		// Check type
		if (type !== "md") throw new Error(`${prefix || ""}-invalid-type`);

		return;
	}

	const allowedFileTypes = [
		"application/pdf", // PDF
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
		"text/plain", // TXT
	];
	if (!allowedFileTypes.includes(file.type)) throw new Error(`${prefix || ""}-invalid-type`);
}
