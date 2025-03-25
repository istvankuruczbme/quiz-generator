export default function createImageUrl(imageFile: File): string {
	return URL.createObjectURL(imageFile);
}
