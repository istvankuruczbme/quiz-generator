import { useEffect, useState } from "react";
import { QuizFullPrivate } from "../types/quizTypes";
import questionOrderOptions, { QuestionOrder } from "../assets/questionOrder";
import quizVisibilityOptions, { QuizVisibility } from "../assets/quizVisibility";

const useQuizData = (quiz: QuizFullPrivate | null) => {
	// #region States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [photoUrl, setPhotoUrl] = useState<string>("");
	const [category, setCategory] = useState("");
	const [visibility, setVisibility] = useState<QuizVisibility>(quizVisibilityOptions[0].value);
	const [questionOrder, setQuestionOrder] = useState<QuestionOrder>(questionOrderOptions[0].value);
	//#endregion

	useEffect(() => {
		if (quiz == null) return;

		setTitle(quiz.title);
		setDescription(quiz.description);
		setPhotoUrl(quiz.photoUrl || "");
		setCategory(quiz.category.id);
		setVisibility(quiz.config.visibility);
		setQuestionOrder(quiz.config.questionOrder);
	}, [quiz]);

	return {
		title,
		setTitle,
		description,
		setDescription,
		photoUrl,
		setPhotoUrl,
		category,
		setCategory,
		visibility,
		setVisibility,
		questionOrder,
		setQuestionOrder,
	};
};

export default useQuizData;
