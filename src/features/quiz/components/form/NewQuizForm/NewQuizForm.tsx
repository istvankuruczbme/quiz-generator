import { FormEvent } from "react";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import Button from "../../../../../components/ui/Button/Button";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import Text from "../../../../../components/ui/Text/Text";
import CategorySelect from "../../../../category/components/form/CategorySelect/CategorySelect";
import QuizDescriptionTextarea from "../QuizDescriptionTextarea/QuizDescriptionTextarea";
import { useNavigate } from "react-router-dom";
import useError from "../../../../error/hooks/useError";
import validateNewQuizData from "../../../utils/validation/validateNewQuizData";
import useCreateQuiz from "../../../hooks/useCreateQuiz";
import useNewQuizData from "../../../hooks/useNewQuizData";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import NewQuizFormSkeleton from "./NewQuizFormSkeleton";

const NewQuizForm = () => {
	// #region Hooks
	const { loading: loadingData, data, updateData } = useNewQuizData();
	const { mutateAsync, loading } = useCreateQuiz();
	const { setError } = useError();
	const navigate = useNavigate();
	// #endregion

	// #region Functions
	async function handleCreateQuizSubmit(e: FormEvent) {
		e.preventDefault();

		try {
			// Validation
			const { title, description, photo, categoryId } = validateNewQuizData(data);

			// Create quiz
			const quiz = await mutateAsync({ title, description, photo, categoryId });

			// Navigate
			navigate(`/quizzes/${quiz.id}/edit`);
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<Suspense loading={loadingData} fallback={<NewQuizFormSkeleton />}>
			<form onSubmit={handleCreateQuizSubmit}>
				<FormInputsContainer>
					<Input
						type="text"
						label="Title"
						id="newQuizTitle"
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
					<FileUpload uploadType="photo" onFileChange={(photo) => updateData({ photo })} />

					<CategorySelect
						id="newQuizCategory"
						value={data.categoryId}
						onChange={(e) => updateData({ categoryId: e.target.value })}
					/>
				</FormInputsContainer>

				<FormButtonsContainer>
					<Button variant="neutral">Preview</Button>
					<LoadingButton type="submit" full loading={loading}>
						Create quiz
					</LoadingButton>
				</FormButtonsContainer>
			</form>
		</Suspense>
	);
};

export default NewQuizForm;
