export default function createBearerAuthHeader(token: string): string {
	return `Bearer ${token}`;
}
