import { PropsWithChildren } from "react";
import QuizSearchContext from "./QuizSearchContext";
import useFormData from "../../../../hooks/form/useFormData";
import { SEARCH_QUIZ_FORM_DATA } from "../../constants/formData";
import useSearchQuizzes from "../../hooks/useSearchQuizzes";

const QuizSearchProvider = ({ children }: PropsWithChildren) => {
	// #region States
	const [data, updateData] = useFormData(SEARCH_QUIZ_FORM_DATA);
	// #endregion

	// #region Hooks
	const { quizzes, loading } = useSearchQuizzes({
		searchText: data.searchText,
		categoryIds: data.selectedCategories,
		limit: data.limit,
	});
	// #endregion

	return (
		<QuizSearchContext.Provider value={{ data, updateData, quizzes, loading }}>
			{children}
		</QuizSearchContext.Provider>
	);
};

export default QuizSearchProvider;
