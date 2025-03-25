import { useEffect, useState } from "react";
import { QuizFullPrivate } from "../types/quizTypes";

const useQuizData = (quiz: QuizFullPrivate | null) => {
	// #region States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);
	const [category, setCategory] = useState("");
	//#endregion

	useEffect(() => {
		if (quiz == null) return;

		setTitle(quiz.title);
		setDescription(quiz.description);
		setPhotoUrl(quiz.photoUrl);
		setCategory(quiz.category.id);
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
	};
};

export default useQuizData;
