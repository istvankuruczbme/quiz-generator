import { PropsWithChildren, useEffect, useState } from "react";
import CompletionPublicContext from "./CompletionPublicContext";
import useGetCompletionPublic from "../../hooks/useGetCompletionPublic";
import { CompletionQuestionPrivate } from "../../../completionQuestion/types/completionQuestionTypes";

const CompletionPublicProvider = ({ children }: PropsWithChildren) => {
	// #region States
	const [questionIndex, setQuestionIndex] = useState(0);
	const [completionQuestion, setCompletionQuestion] = useState<CompletionQuestionPrivate | null>(
		null
	);
	const [selectedAnswerOptions, setSelectedAnswerOptions] = useState<string[]>([]);
	//#endregion

	//#region Hooks
	const { completion, loading } = useGetCompletionPublic();

	useEffect(() => {
		// No completion
		if (!completion) return;

		// Set question index
		const answeredQuestions = completion.quiz.questions.filter(
			(question) => question.completion !== undefined
		);
		// .sort(
		// 	(a, b) =>
		// 		new Date(a.completion!.answeredAt).getTime() -
		// 		new Date(b.completion!.answeredAt).getTime()
		// );
		setQuestionIndex(answeredQuestions.length);
	}, [completion]);
	//#endregion

	// #region Variables
	const question = completion?.quiz.questions[questionIndex] ?? null;
	//#endregion

	// #region Functions
	function handleAnswerOptionChange(optionId: string) {
		setSelectedAnswerOptions((optionIds) => {
			if (optionIds.includes(optionId)) return optionIds.filter((id) => id !== optionId);
			else return [...optionIds, optionId];
		});
	}

	function removeAnswerOptions(optionIds: string[]) {
		setSelectedAnswerOptions((ids) => ids.filter((id) => !optionIds.includes(id)));
	}

	function resetAnswerOptions() {
		setSelectedAnswerOptions([]);
	}

	function goToNextQuestion() {
		setQuestionIndex((index) => index + 1);
	}
	// #endregion

	return (
		<CompletionPublicContext.Provider
			value={{
				completion,
				loading,
				question,
				questionNumber: questionIndex + 1,
				completionQuestion,
				setCompletionQuestion,
				selectedAnswerOptions,
				handleAnswerOptionChange,
				removeAnswerOptions,
				resetAnswerOptions,
				goToNextQuestion,
			}}
		>
			{children}
		</CompletionPublicContext.Provider>
	);
};

export default CompletionPublicProvider;
