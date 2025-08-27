import AppError from "../../features/error/classes/AppError";

export default function validateImageFile(file?: File): void {
	// Check file
	if (!file) throw new AppError({ message: "Image file missing." });

	// Validate image file type
	if (!file.type.startsWith("image/")) throw new AppError({ message: "Invalid image file." });
}
