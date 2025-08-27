import { FormEvent } from "react";
import useError from "../../../error/hooks/useError";
import useFeedback from "../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import Text from "../../../../components/ui/Text/Text";
import FileUpload from "../../../../components/layout/FileUpload/FileUpload";
import Input from "../../../../components/form/Input/Input";
import Skeleton from "../../../../components/ui/Skeleton/Skeleton";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import useEditUserData from "../../hooks/useEditUserData";
import validateEditUserData from "../../utils/validation/validateEditUserData";
import useUpdateUser from "../../hooks/useUpdateUser";

const EditUserForm = () => {
	// #region Hooks
	const { user, loading: loadingData, data, updateData } = useEditUserData();
	const { mutateAsync, loading } = useUpdateUser();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleSubmitPersonalData(e: FormEvent) {
		e.preventDefault();

		// Check user
		if (!user) return;

		try {
			// Validation
			const { name, photoUrl } = validateEditUserData({
				name: data.name,
				photoUrl: data.photoUrl === "" ? null : data.photoUrl,
			});

			// Update user name and photo in DB
			await mutateAsync({ photo: data.photo, name, photoUrl });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Personal data updated.",
			});
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<form onSubmit={handleSubmitPersonalData}>
			<FormInputsContainer>
				<Text mb="-1rem">Photo</Text>
				<FileUpload
					uploadType="photo"
					defaultPhotoUrl={data.photoUrl}
					onFileChange={(photo, photoUrl) => updateData({ photo, photoUrl: photoUrl ?? "" })}
				/>

				{!loadingData ? (
					<Input
						type="text"
						label="Name"
						id="profileName"
						placeholder="Name"
						full
						required
						value={data.name}
						onChange={(e) => updateData({ name: e.target.value })}
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
	);
};

export default EditUserForm;
