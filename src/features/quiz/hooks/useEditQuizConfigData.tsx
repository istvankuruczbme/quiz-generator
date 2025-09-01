import { useEffect } from "react";
import useFormData from "../../../hooks/form/useFormData";
import { EDIT_QUIZ_CONFIG_FORM_DATA } from "../constants/formData";
import useQuizPrivate from "../contexts/QuizPrivateContext/useQuizPrivate";

const useEditQuizConfigData = () => {
	// #region States
	const [data, updateData] = useFormData(EDIT_QUIZ_CONFIG_FORM_DATA);
	// #endregion

	// #region Hooks
	const { quiz, loading } = useQuizPrivate();
	// #endregion

	useEffect(() => {
		// No quiz
		if (!quiz) return;

		// Update form data with quiz config data
		updateData({ visibility: quiz.config.visibility, questionOrder: quiz.config.questionOrder });
	}, [quiz, updateData]);

	return { quiz, loading, data, updateData };
};

export default useEditQuizConfigData;
