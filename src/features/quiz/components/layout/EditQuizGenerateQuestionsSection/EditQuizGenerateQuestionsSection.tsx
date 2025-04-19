import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import Text from "../../../../../components/ui/Text/Text";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import Radio from "../../../../../components/form/Radio/Radio";
import Input from "../../../../../components/form/Input/Input";
import QuizCreativityRange from "../../form/QuizCreativityRange/QuizCreativityRange";
import Section from "../../../../../components/layout/Section/Section";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
// Hooks
import useQuizGenerationData from "../../../hooks/useQuizGenerationData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useEditQuiz from "../../../contexts/EditQuizContext/useEditQuiz";
import useError from "../../../../ui/error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateQuizGenerationData from "../../../utils/validation/validateQuizGenerationData";
import generateQuestions from "../../../../question/services/generateQuestions";
// CSS
import "./EditQuizGenerateQuestionsSection.css";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";

type EditQuizGenerateQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizGenerateQuestionsSection: FC<EditQuizGenerateQuestionsSectionProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz, updateQuizState } = useQuizPrivate();
	const { questionCount, setQuestionCount, answerOptionCount, setAnswerOptionCount } =
		useQuizGenerationData();
	const { setLoadingGeneration } = useEditQuiz();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Refs
	const fileRef = useRef<HTMLInputElement>(null);
	const randomStrategyRef = useRef<HTMLInputElement>(null);
	const creativityRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Functions
	async function handleGenerateQuestions(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		setLoading(true);
		setLoadingGeneration(true);

		// Input values
		const file = fileRef.current?.files?.[0];
		const randomStrategy = randomStrategyRef.current?.checked;
		const creativity = creativityRef.current?.valueAsNumber;

		try {
			// Validation
			validateQuizGenerationData(
				file,
				randomStrategy,
				creativity,
				questionCount,
				answerOptionCount
			);
		} catch (err) {
			setError(err);
			setLoading(false);
			setLoadingGeneration(false);
			return;
		}

		try {
			// Get strategy
			const strategy = randomStrategy ? "RANDOM" : "RANDOM";

			// Generate questions
			await generateQuestions(
				quiz.id,
				file as File,
				strategy,
				creativity as number,
				questionCount,
				answerOptionCount
			);

			// Update quiz state
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Questions generated.",
			});
		} catch (err) {
			// console.log("Error generating questions.", err);
			setError(err);
		} finally {
			setLoading(false);
			setLoadingGeneration(false);
		}
	}
	//#endregion

	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Generate questions</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<Text variant="neutral-400">
						Generate questions from file. You only have to select a text document (.txt / .md
						/ .pdf / .docx) and click on Generate.
					</Text>
					<Text variant="neutral-400">
						Make sure that the document contains only the relevant part you want to generate
						the questions from. For example make sure to exclude parts like table of content
						etc.
					</Text>
					<Text variant="neutral-400">
						Currently only hungarian and english languages are supported.
					</Text>

					<form onSubmit={handleGenerateQuestions}>
						<div className="editQuizGenerateQuestionsSection__form__inputs">
							<div className="editQuizGenerateQuestionsSection__form__inputs__left">
								<Text mb=".5rem">File</Text>
								<FileUpload uploadType="file" ref={fileRef} />
							</div>

							<FormInputsContainer>
								<Text mb="-1rem">Strategy</Text>
								<Radio
									label="Random"
									name="editQuizQuestionsStrategy"
									id="editQuizQuestionsStrategyRandom"
									defaultChecked
									ref={randomStrategyRef}
								/>

								<QuizCreativityRange ref={creativityRef} />

								{loadingQuiz && (
									<>
										<Skeleton type="rect" width="100%" height="3rem" />
										<Skeleton type="rect" width="100%" height="3rem" />
									</>
								)}

								{!loadingQuiz && (
									<>
										<Input
											type="number"
											label="Number of questions"
											id="editQuizQuestionsQuestionCount"
											placeholder="Number of questions"
											min={1}
											required
											value={questionCount || ""}
											onChange={(e) => setQuestionCount(parseInt(e.target.value))}
										/>
										<Input
											type="number"
											label="Number of answer options (per quiz)"
											id="editQuizQuestionsAnswerOptionCount"
											placeholder="Number of answer options (per quiz)"
											min={1}
											required
											value={answerOptionCount || ""}
											onChange={(e) => setAnswerOptionCount(parseInt(e.target.value))}
										/>
									</>
								)}
							</FormInputsContainer>
						</div>

						<LoadingButton type="submit" full loading={loading}>
							Generate
						</LoadingButton>
					</form>
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizGenerateQuestionsSection;
