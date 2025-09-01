import { FormEvent } from "react";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import Button from "../../../../../components/ui/Button/Button";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import Text from "../../../../../components/ui/Text/Text";
import CategorySelect from "../../../../category/components/form/CategorySelect/CategorySelect";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useEditQuizData from "../../../hooks/useEditQuizData";
import QuizDescriptionTextarea from "../QuizDescriptionTextarea/QuizDescriptionTextarea";
import validateEditQuizData from "../../../utils/validation/validateEditQuizData";
import useUpdateQuizData from "../../../hooks/useUpdateQuizData";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import EditQuizDataFormSkeleton from "./EditQuizDataFormSkeleton";

const EditQuizDataForm = () => {
	// #region Hooks
	const { quiz, loading: loadingData, data, updateData } = useEditQuizData();
	const { mutateAsync, loading } = useUpdateQuizData();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	//#region Functions
	async function handleUpdateQuizData(e: FormEvent) {
		e.preventDefault();

		// Check quiz
		if (!quiz) return;

		try {
			// Validation
			const quizData = validateEditQuizData(data);

			// Update quiz data
			await mutateAsync({
				id: quiz.id,
				data: quizData,
			});

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz updated.",
			});
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<Suspense loading={loadingData} fallback={<EditQuizDataFormSkeleton />}>
			<form onSubmit={handleUpdateQuizData}>
				<FormInputsContainer>
					<Input
						type="text"
						id="editQuizTitle"
						label="Title"
						placeholder="Title"
						required
						value={data.title}
						onChange={(e) => updateData({ title: e.target.value })}
					/>

					<QuizDescriptionTextarea
						value={data.description}
						onChange={(e) => updateData({ description: e.target.value })}
					/>

					<Text mb="-1rem">Photo</Text>
					<FileUpload
						uploadType="photo"
						defaultPhotoUrl={data.photoUrl ?? ""}
						onFileChange={(photo, photoUrl) =>
							updateData({ photo, photoUrl: photoUrl ?? null })
						}
					/>

					<CategorySelect
						value={data.categoryId}
						onChange={(e) => updateData({ categoryId: e.target.value })}
					/>
				</FormInputsContainer>

				<FormButtonsContainer>
					<Button variant="neutral">Preview</Button>
					<LoadingButton type="submit" full loading={loading}>
						Save
					</LoadingButton>
				</FormButtonsContainer>
			</form>
		</Suspense>
	);
};

export default EditQuizDataForm;
