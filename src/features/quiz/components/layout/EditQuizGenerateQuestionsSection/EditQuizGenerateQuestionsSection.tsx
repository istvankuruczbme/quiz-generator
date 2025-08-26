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
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import TfidfInfoModal from "../TfidfInfoModal/TfidfInfoModal";
import RandomInfoModal from "../RandomInfoModal/RandomInfoModal";
import TfidfStrategyLabel from "../../ui/TfidfStrategyLabel/TfidfStrategyLabel";
import RandomStrategyLabel from "../../ui/RandomStrategyLabel/RandomStrategyLabel";
// Hooks
import useQuizGenerationData from "../../../hooks/useQuizGenerationData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useEditQuiz from "../../../contexts/EditQuizContext/useEditQuiz";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateQuizGenerationData from "../../../utils/validation/validateQuizGenerationData";
import generateQuestions from "../../../../question/services/generateQuestions";
import convertNumberToInputValue from "../../../../../utils/dom/convertNumberToInputValue";
import getGenerationStrategy from "../../../utils/getGenerationStrategy";
// CSS
import "./EditQuizGenerateQuestionsSection.css";

type EditQuizGenerateQuestionsSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizGenerateQuestionsSection: FC<EditQuizGenerateQuestionsSectionProps> = () => {
	// #region States
	const [showTfidfInfoModal, setShowTfidfInfoModal] = useState(false);
	const [showRandomInfoModal, setShowRandomInfoModal] = useState(false);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz, updateQuizState } = useQuizPrivate();
	const {
		questionCount,
		setQuestionCount,
		answerOptionCount,
		setAnswerOptionCount,
		maxQuestionCount,
		maxAnswerOptionCount,
	} = useQuizGenerationData();
	const { setLoadingGeneration } = useEditQuiz();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Refs
	const fileRef = useRef<HTMLInputElement>(null);
	const randomStrategyRef = useRef<HTMLInputElement>(null);
	const tfidfStrategyRef = useRef<HTMLInputElement>(null);
	const embeddingStrategyRef = useRef<HTMLInputElement>(null);
	const creativityRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Variables
	const maxPossibleQuestionCount =
		quiz == undefined ? undefined : maxQuestionCount - quiz.questions.length;
	// #endregion

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
		const tfidfStrategy = tfidfStrategyRef.current?.checked;
		const embeddingStrategy = embeddingStrategyRef.current?.checked;
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
			// Set feedback
			setFeedback({
				type: "info",
				message: "Generation can take some time.",
				details: "Please do not close the browser.",
			});

			// Get strategy
			const strategy = getGenerationStrategy(randomStrategy, tfidfStrategy, embeddingStrategy);

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
			<TfidfInfoModal show={showTfidfInfoModal} setShow={setShowTfidfInfoModal} />
			<RandomInfoModal show={showRandomInfoModal} setShow={setShowRandomInfoModal} />

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
								<FlexContainer direction="column" gap="1rem">
									<Text mb="0">Strategy</Text>
									<Radio
										label={<TfidfStrategyLabel setShowModal={setShowTfidfInfoModal} />}
										name="editQuizQuestionsStrategy"
										id="editQuizQuestionsStrategyTFIDF"
										defaultChecked
										ref={tfidfStrategyRef}
									/>
									<Radio
										label={<RandomStrategyLabel setShowModal={setShowRandomInfoModal} />}
										name="editQuizQuestionsStrategy"
										id="editQuizQuestionsStrategyRandom"
										ref={randomStrategyRef}
									/>
									<Radio
										label="Embedding"
										name="editQuizQuestionsStrategy"
										id="editQuizQuestionsStrategyEmbedding"
										ref={embeddingStrategyRef}
									/>
								</FlexContainer>

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
											label="Questions"
											id="editQuizQuestionsQuestionCount"
											max={convertNumberToInputValue(maxPossibleQuestionCount)}
											placeholder="Questions"
											value={convertNumberToInputValue(questionCount)}
											min={1}
											required
											onChange={(e) => setQuestionCount(parseInt(e.target.value))}
										/>
										<Input
											type="number"
											label="Answer options (/question)"
											id="editQuizQuestionsAnswerOptionCount"
											placeholder="Answer options (/question)"
											min={1}
											max={convertNumberToInputValue(maxAnswerOptionCount)}
											required
											value={convertNumberToInputValue(answerOptionCount)}
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
