import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef } from "react";
import { supabase } from "../../../../../config/supabase";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useProfilePersonalData from "../../../hooks/useProfilePersonalData";
// Functions
import validatePersonalDataInputs from "../../../utils/validation/validatePersonalDataInputs";
import updateUserPersonalData from "../../../services/updateUserPersonalData";
// CSS
import "./ProfilePersonalSection.css";

type ProfilePersonalSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfilePersonalSection: FC<ProfilePersonalSectionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { photoUrl, setPhotoUrl, name, setName, email, setEmail } = useProfilePersonalData();
	// #endregion

	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
		// Get selected file
		const file = e.target.files?.[0];

		// Check if there is a file
		if (file == undefined) return;

		// Validate image file type
		if (!file.type.startsWith("image/")) return;

		// Create image URL
		const photoUrl = URL.createObjectURL(file);

		// Update photoURL state
		setPhotoUrl(photoUrl);
	}

	async function handleSubmitPersonalData(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		// Check user
		if (user == null) return;

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Check input values
			validatePersonalDataInputs(name, email);
		} catch (err) {
			console.log("Error validating sign up data.\n", err);
			return;
		}

		try {
			// Update user email in Supabase
			await supabase.auth.updateUser({
				email: email as string,
			});

			// Update user name and email in DB
			await updateUserPersonalData(user.id, name, email, photo);

			console.log("Successful update.");
		} catch (err) {
			console.log("Error updating the personal data of user.", err);
		}
	}
	//#endregion

	return (
		<div>
			<h2>Personal data</h2>

			<form onSubmit={handleSubmitPersonalData}>
				<img src={photoUrl === "" ? undefined : photoUrl} alt={name} />
				<input
					type="file"
					id="profilePhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<br />

				<label htmlFor="profileName">Name:</label>
				<input
					type="text"
					id="profileName"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<br />

				<label htmlFor="profileEmail">Email:</label>
				<input
					type="email"
					id="profileEmail"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<br />

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ProfilePersonalSection;
