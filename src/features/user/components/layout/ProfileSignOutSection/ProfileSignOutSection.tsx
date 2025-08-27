import Section from "../../../../../components/layout/Section/Section";
import Button from "../../../../../components/ui/Button/Button";
import signOut from "../../../../auth/services/signOut";
import useError from "../../../../error/hooks/useError";
import ProfileSection from "../ProfileSection/ProfileSection";

const ProfileSignOutSection = () => {
	// #region Hooks
	const { setError } = useError();
	// #endregion

	// #region Functions
	async function handleSignOutClick() {
		try {
			await signOut();
		} catch (err) {
			setError(err);
		}
	}
	// #endregion

	return (
		<ProfileSection>
			<Section.Title>Sign out</Section.Title>

			<Button variant="neutral" onClick={handleSignOutClick}>
				Sign out
			</Button>
		</ProfileSection>
	);
};

export default ProfileSignOutSection;
