import { FormEvent } from "react";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import QuestionOrderSelect from "../QuestionOrderSelect/QuestionOrderSelect";
import QuizVisibilitySelect from "../QuizVisibilitySelect/QuizVisibilitySelect";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useEditQuizConfigData from "../../../hooks/useEditQuizConfigData";
import { QuizVisibility } from "../../../assets/quizVisibility";
import { QuestionOrder } from "../../../assets/questionOrder";
import useUpdateQuizConfig from "../../../hooks/useUpdateQuizConfig";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import EditQuizConfigFormSkeleton from "./EditQuizConfigFormSkeleton/EditQuizConfigFormSkeleton";

const EditQuizConfigForm = () => {
	// #region Hooks
	const { quiz, loading: loadingData, data, updateData } = useEditQuizConfigData();
	const { mutateAsync, loading } = useUpdateQuizConfig();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Functions
	async function handleUpdateQuizConfig(e: FormEvent) {
		e.preventDefault();

		// Check quiz
		if (!quiz) return;

		try {
			// Update quiz config
			await mutateAsync({ quizId: quiz.id, data });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz config updated.",
			});
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<Suspense loading={loadingData} fallback={<EditQuizConfigFormSkeleton />}>
			<form onSubmit={handleUpdateQuizConfig}>
				<FormInputsContainer>
					<FlexContainer gap="2rem">
						<QuizVisibilitySelect
							full
							value={data.visibility}
							onChange={(e) => updateData({ visibility: e.target.value as QuizVisibility })}
						/>
						<QuestionOrderSelect
							full
							value={data.questionOrder}
							onChange={(e) =>
								updateData({ questionOrder: e.target.value as QuestionOrder })
							}
						/>
					</FlexContainer>
				</FormInputsContainer>

				<FormButtonsContainer>
					<LoadingButton type="submit" full loading={loading}>
						Save
					</LoadingButton>
				</FormButtonsContainer>
			</form>
		</Suspense>
	);
};

export default EditQuizConfigForm;
