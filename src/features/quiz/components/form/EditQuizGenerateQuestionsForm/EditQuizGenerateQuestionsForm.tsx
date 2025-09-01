import { FormEvent, useState } from "react";
import Text from "../../../../../components/ui/Text/Text";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import Radio from "../../../../../components/form/Radio/Radio";
import TfidfStrategyLabel from "../../ui/TfidfStrategyLabel/TfidfStrategyLabel";
import RandomStrategyLabel from "../../ui/RandomStrategyLabel/RandomStrategyLabel";
import QuizCreativityRange from "../QuizCreativityRange/QuizCreativityRange";
import useQuizGenerationData from "../../../hooks/useEditQuizQuestionGenerationData";
import Input from "../../../../../components/form/Input/Input";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import convertNumberToInputValue from "../../../../../utils/dom/convertNumberToInputValue";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useEditQuiz from "../../../contexts/EditQuizContext/useEditQuiz";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import TfidfInfoModal from "../../layout/TfidfInfoModal/TfidfInfoModal";
import RandomInfoModal from "../../layout/RandomInfoModal/RandomInfoModal";
import validateEditQuizQuestionGenerationData from "../../../utils/validation/validateEditQuizQuestionGenerationData";
import useGenerateQuestions from "../../../../question/hooks/useGenerateQuestions";
import transformEditQuizGenerateQuestionsFormData from "../../../utils/transformEditQuizGenerateQuestionsFormData";

const EditQuizGenerateQuestionsForm = () => {
	// #region States
	const [showTfidfInfoModal, setShowTfidfInfoModal] = useState(false);
	const [showRandomInfoModal, setShowRandomInfoModal] = useState(false);
	// #endregion

	// #region Hooks
	const {
		quiz,
		loading: loadingData,
		data,
		updateData,
		maxQuestionCount,
		maxAnswerOptionCount,
	} = useQuizGenerationData();
	const { mutateAsync, loading } = useGenerateQuestions();
	const { setLoadingGeneration } = useEditQuiz();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Functions
	async function handleGenerateQuestions(e: FormEvent) {
		e.preventDefault();

		// Check quiz
		if (!quiz) return;

		setLoadingGeneration(true);

		// Transform data
		const transformedData = transformEditQuizGenerateQuestionsFormData(data);

		try {
			// Validation
			const generationData = validateEditQuizQuestionGenerationData(transformedData, {
				maxQuestionCount,
				maxAnswerOptionCount,
			});

			// Set feedback
			setFeedback({
				type: "info",
				message: "Generation can take some time.",
				details: "Please do not close the browser.",
			});

			// Generate questions
			await mutateAsync({ quizId: quiz.id, data: generationData });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Questions generated.",
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoadingGeneration(false);
		}
	}
	//#endregion

	return (
		<Suspense loading={loadingData} fallback={null}>
			<TfidfInfoModal show={showTfidfInfoModal} setShow={setShowTfidfInfoModal} />
			<RandomInfoModal show={showRandomInfoModal} setShow={setShowRandomInfoModal} />

			<form onSubmit={handleGenerateQuestions}>
				<div className="editQuizGenerateQuestionsSection__form__inputs">
					<div className="editQuizGenerateQuestionsSection__form__inputs__left">
						<Text mb=".5rem">File</Text>
						<FileUpload uploadType="file" onFileChange={(file) => updateData({ file })} />
					</div>

					<FormInputsContainer>
						<FlexContainer direction="column" gap="1rem">
							<Text mb="0">Strategy</Text>
							<Radio
								label={<TfidfStrategyLabel setShowModal={setShowTfidfInfoModal} />}
								name="editQuizQuestionsStrategy"
								id="editQuizQuestionsStrategyTFIDF"
								checked={data.strategy === "TFIDF"}
								onChange={() => updateData({ strategy: "TFIDF" })}
							/>
							<Radio
								label={<RandomStrategyLabel setShowModal={setShowRandomInfoModal} />}
								name="editQuizQuestionsStrategy"
								id="editQuizQuestionsStrategyRandom"
								checked={data.strategy === "RANDOM"}
								onChange={() => updateData({ strategy: "RANDOM" })}
							/>
							<Radio
								label="Embedding"
								name="editQuizQuestionsStrategy"
								id="editQuizQuestionsStrategyEmbedding"
								checked={data.strategy === "EMBEDDING"}
								onChange={() => updateData({ strategy: "EMBEDDING" })}
							/>
						</FlexContainer>

						<QuizCreativityRange
							value={data.creativity}
							onChange={(e) => updateData({ creativity: e.target.valueAsNumber })}
						/>

						<Input
							type="number"
							label="Questions"
							id="editQuizQuestionsQuestionCount"
							placeholder="Questions"
							required
							min={1}
							max={convertNumberToInputValue(maxQuestionCount)}
							value={data.questionCount}
							onChange={(e) => updateData({ questionCount: e.target.value })}
						/>
						<Input
							type="number"
							label="Answer options (/question)"
							id="editQuizQuestionsAnswerOptionCount"
							placeholder="Answer options (/question)"
							required
							min={1}
							max={convertNumberToInputValue(maxAnswerOptionCount)}
							value={data.answerOptionCount}
							onChange={(e) => updateData({ answerOptionCount: e.target.value })}
						/>
					</FormInputsContainer>
				</div>

				<LoadingButton type="submit" full loading={loading}>
					Generate
				</LoadingButton>
			</form>
		</Suspense>
	);
};

export default EditQuizGenerateQuestionsForm;
