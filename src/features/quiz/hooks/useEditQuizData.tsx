import { useEffect } from "react";
import useFormData from "../../../hooks/form/useFormData";
import { EDIT_QUIZ_DATA_FORM_DATA } from "../constants/formData";
import useQuizPrivate from "../contexts/QuizPrivateContext/useQuizPrivate";

const useEditQuizData = () => {
	// #region States
	const [data, updateData] = useFormData(EDIT_QUIZ_DATA_FORM_DATA);
	//#endregion

	// #region Hooks
	const { quiz, loading } = useQuizPrivate();
	//#endregion

	useEffect(() => {
		// No quiz
		if (!quiz) {
			updateData(EDIT_QUIZ_DATA_FORM_DATA);
			return;
		}

		// Update for data qith quiz data
		updateData({
			title: quiz.title,
			description: quiz.description,
			photoUrl: quiz.photoUrl,
			categoryId: quiz.category.id,
		});
	}, [quiz, updateData]);

	return {
		quiz,
		loading,
		data,
		updateData,
	};
};

export default useEditQuizData;
