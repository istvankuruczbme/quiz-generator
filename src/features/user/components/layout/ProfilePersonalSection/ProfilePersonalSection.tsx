import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import ProfileSection from "../ProfileSection/ProfileSection";
import Section from "../../../../../components/layout/Section/Section";
import Text from "../../../../../components/ui/Text/Text";
import Input from "../../../../../components/form/Input/Input";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import DeleteUserPhotoModal from "../DeleteUserPhotoModal/DeleteUserPhotoModal";
import Button from "../../../../../components/ui/Button/Button";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useError from "../../../../ui/error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useProfilePersonalData from "../../../hooks/useProfilePersonalData";
// Functions
import validatePersonalDataInputs from "../../../utils/validation/validatePersonalDataInputs";
import updateUserPersonalData from "../../../services/updateUserPersonalData";
// CSS
import "./ProfilePersonalSection.css";

type ProfilePersonalSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfilePersonalSection: FC<ProfilePersonalSectionProps> = () => {
	// #region States
	const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { user, loading: loadingUser, updateUserState } = useUser();
	const { photoUrl, setPhotoUrl, name, setName } = useProfilePersonalData();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	// #endregion

	// #region Variables
	const hasUserPhoto = user?.photoUrl !== null;
	//#endregion

	// #region Functions
	async function handleSubmitPersonalData(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		// Check user
		if (user == null) return;

		setLoading(true);

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Check input values
			validatePersonalDataInputs(name);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Update user name and photo in DB
			await updateUserPersonalData(user.id, name, photo);

			// Update user state
			await updateUserState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Personal data saved.",
			});
		} catch (err) {
			console.log("Error updating the personal data of user.", err);
			setError(err);
			return;
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<ProfileSection>
			{hasUserPhoto && (
				<DeleteUserPhotoModal
					show={showDeletePhotoModal}
					setShow={setShowDeletePhotoModal}
					setPhotoUrl={setPhotoUrl}
				/>
			)}

			<Section.Title>Personal data</Section.Title>

			<form onSubmit={handleSubmitPersonalData}>
				<FormInputsContainer>
					<Text mb="-1rem">Photo</Text>
					<FileUpload
						uploadType="photo"
						defaultPhotoUrl={photoUrl}
						deleteFileButton={
							hasUserPhoto ? (
								<Button variant="danger" onClick={() => setShowDeletePhotoModal(true)}>
									Delete photo
								</Button>
							) : null
						}
						ref={photoRef}
					/>

					{!loadingUser ? (
						<Input
							type="text"
							label="Name"
							id="profileName"
							placeholder="Name"
							value={name}
							full
							onChange={(e) => setName(e.target.value)}
							required
						/>
					) : (
						<Skeleton type="rect" width="100%" height="40px" />
					)}

					<LoadingButton
						type="submit"
						variant="accent"
						className="profilePersonal__save"
						loading={loading}
					>
						Save
					</LoadingButton>
				</FormInputsContainer>
			</form>
		</ProfileSection>
	);
};

export default ProfilePersonalSection;
