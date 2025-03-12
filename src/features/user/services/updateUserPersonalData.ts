import { axios } from "../../../config/axios";

export default async function updateUserPersonalData(
	id: string,
	name: string,
	email: string,
	photo: File | undefined
): Promise<void> {
	// Create form data
	const userPersonalData = new FormData();
	userPersonalData.append("name", name);
	userPersonalData.append("email", email);
	if (photo != undefined) userPersonalData.append("file", photo);

	await axios.put(`/users/${id}/personal`, userPersonalData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
}
