import { FC, FormEvent, HTMLAttributes, useRef } from "react";
import useQuizGenerationData from "../../../hooks/useQuizGenerationData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import validateQuizGenerationData from "../../../utils/validation/validateQuizGenerationData";
import generateQuestions from "../../../../question/services/generateQuestions";
import "./EditQuizQuestionsFromFile.css";

type EditQuizQuestionsFromFileProps = HTMLAttributes<HTMLDivElement>;

const EditQuizQuestionsFromFile: FC<EditQuizQuestionsFromFileProps> = () => {
	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { questionCount, setQuestionCount, answerOptionCount, setAnswerOptionCount } =
		useQuizGenerationData();
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
			console.log(err);
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
		} catch (err) {
			console.log("Error generating questions.", err);
			return;
		}

		// Update quiz state
		await updateQuizState();
		console.log("Questions generated.");
	}
	//#endregion

	return (
		<div>
			<h3>Generate questions from file</h3>

			<p>Select a text document (txt, pdf, docx).</p>
			<p>Currently only hungarian and english languages are supported.</p>
			<p>
				Make sure that the document contains only the relevant part you want to generate the
				questions from. For example make sure to exclude parts like table of content etc.
			</p>

			<form onSubmit={handleGenerateQuestions}>
				<label htmlFor="editQuizQuestionsFile">Text document</label>
				<input type="file" id="editQuizQuestionsFile" required ref={fileRef} />
				<br />

				<details>
					<summary>Config:</summary>

					<div>
						<span>Strategy</span>
						<input
							type="radio"
							name="editQuizQuestionsStrategy"
							id="editQuizQuestionsStrategyRandom"
							defaultChecked
							ref={randomStrategyRef}
						/>
						<label htmlFor="editQuizQuestionsStrategyRandom">Random</label>
						<br />

						<label htmlFor="editQuizQuestionsCreativity">Creativity: </label>
						<span>0%</span>
						<input
							type="range"
							id="editQuizQuestionsCreativity"
							defaultValue={50}
							min={0}
							max={100}
							required
							ref={creativityRef}
						/>
						<span>100%</span>
						<br />

						<label htmlFor="editQuizQuestionsQuestionCount">Number of questions</label>
						<input
							type="number"
							id="editQuizQuestionsQuestionCount"
							min={1}
							required
							value={questionCount || ""}
							onChange={(e) => setQuestionCount(parseInt(e.target.value))}
						/>
						<br />

						<label htmlFor="editQuizQuestionsAnswerOptionCount">
							Number of answer options (per question)
						</label>
						<input
							type="number"
							id="editQuizQuestionsAnswerOptionCount"
							min={1}
							required
							value={answerOptionCount || ""}
							onChange={(e) => setAnswerOptionCount(parseInt(e.target.value))}
						/>
						<br />
					</div>
				</details>

				<button type="submit">Generate</button>
			</form>

			<hr />
		</div>
	);
};

export default EditQuizQuestionsFromFile;
