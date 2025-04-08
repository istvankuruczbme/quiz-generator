export default function validateTextFile(file: File | undefined, prefix?: string): void {
	if (file == undefined) throw new Error(`${prefix || ""}-missing`);

	const allowedFileTypes = [
		"application/pdf", // PDF
		"application/msword", // DOC
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
		// "text/markdown", // TXT
		"text/plain", // TXT
	];
	if (!allowedFileTypes.includes(file.type)) throw new Error(`${prefix || ""}-invalid-type`);
}
