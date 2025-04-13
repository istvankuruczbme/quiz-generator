import { FC, HTMLAttributes } from "react";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import { useNavigate } from "react-router-dom";
// Functions
import deleteUserDb from "../../../services/deleteUser";
// CSS
import "./ProfileDeleteSection.css";
import signOut from "../../../../auth/services/signOut";
import Section from "../../../../../components/layout/Section/Section";
import Button from "../../../../../components/ui/Button/Button";
import Text from "../../../../../components/ui/Text/Text";

type ProfileDeleteSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileDeleteSection: FC<ProfileDeleteSectionProps> = () => {
	//#region Hooks
	const { user } = useUser();
	const navigate = useNavigate();
	//#endregion

	// #region Functions
	async function handleDeleteUserClick(): Promise<void> {
		// Confirmation
		const confirm = window.confirm("Are you sure you want to delete your account?");
		if (!confirm) return;

		// Check user
		if (user == null) return;

		try {
			// Delete user
			await deleteUserDb(user.id);
		} catch (err) {
			console.log("Error deleting the user from DB.", err);
			return;
		}

		try {
			// Sign out user
			await signOut();
		} catch (err) {
			console.log("Error signing out the user.", err);
			return;
		}

		// Navigate to home page
		navigate("/");
	}
	//#endregion

	return (
		<Section>
			<Section.Title>Delete profile</Section.Title>

			<Text variant="neutral-400">
				Click on the button below to delete your account. By deleting your account your
				subscription will be lost.
			</Text>

			<Button variant="danger" onClick={handleDeleteUserClick}>
				Delete profile
			</Button>
		</Section>
	);
};

export default ProfileDeleteSection;
