export default function validateImageFile(file: File | undefined): void {
	// Check if there is a file
	if (file == undefined) throw new Error("file/missing");

	// Validate image file type
	if (!file.type.startsWith("image/")) throw new Error("file/not-an-image");
}
