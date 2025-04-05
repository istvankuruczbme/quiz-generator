import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef } from "react";
// Components
import { Link } from "react-router-dom";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useProfilePersonalData from "../../../hooks/useProfilePersonalData";
// Functions
import validatePersonalDataInputs from "../../../utils/validation/validatePersonalDataInputs";
import updateUserPersonalData from "../../../services/updateUserPersonalData";
import validateImageFile from "../../../../../utils/image/validateImageFile";
import createImageUrl from "../../../../../utils/image/createImageUrl";
import removeUserPhoto from "../../../services/removeUserPhoto";
// CSS
import "./ProfilePersonalSection.css";

type ProfilePersonalSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfilePersonalSection: FC<ProfilePersonalSectionProps> = () => {
	// #region Hooks
	const { user, updateUserState } = useUser();
	const { photoUrl, setPhotoUrl, name, setName } = useProfilePersonalData();
	// #endregion

	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Functions
	function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
		// Get selected file
		const file = e.target.files?.[0];

		try {
			// Validate image file
			validateImageFile(file);
		} catch (err) {
			console.log(err);
			return;
		}

		// Create image URL
		const photoUrl = createImageUrl(file as File);

		// Update photoURL state
		setPhotoUrl(photoUrl);
	}

	async function handleRemovePhoto() {
		// Confirm
		const confirm = window.confirm("Are you sure you want to remove your photo?");
		if (!confirm) return;

		// Check user
		if (user == null) return;

		try {
			// Remove user photo
			await removeUserPhoto(user.id);
		} catch (err) {
			console.log("Error removing the photo of user.", err);
			return;
		}

		// Update user state
		await updateUserState();
		setPhotoUrl("");
		console.log("Photo removed.");
	}

	async function handleSubmitPersonalData(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		// Check user
		if (user == null) return;

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Check input values
			validatePersonalDataInputs(name);
		} catch (err) {
			console.log("Error validating sign up data.\n", err);
			return;
		}

		try {
			// Update user name and photo in DB
			await updateUserPersonalData(user.id, name, photo);
		} catch (err) {
			console.log("Error updating the personal data of user.", err);
			return;
		}

		// Update user state
		await updateUserState();

		console.log("Successful update.");
	}
	//#endregion

	return (
		<div>
			<h2>Personal data</h2>

			<div>
				<Link to="/profile/change-email">
					<button type="button" tabIndex={-1}>
						Change email
					</button>
				</Link>
				<Link to="/profile/change-password">
					<button type="button" tabIndex={-1}>
						Change password
					</button>
				</Link>
			</div>

			<form onSubmit={handleSubmitPersonalData}>
				<img src={photoUrl || undefined} alt={name} />
				<input
					type="file"
					id="profilePhoto"
					accept="image/*"
					onChange={handleFileChange}
					ref={photoRef}
				/>
				<button type="button" onClick={handleRemovePhoto}>
					Remove photo
				</button>
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

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default ProfilePersonalSection;
