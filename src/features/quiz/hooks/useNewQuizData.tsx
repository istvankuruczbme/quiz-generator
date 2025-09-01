import { useEffect } from "react";
import useFormData from "../../../hooks/form/useFormData";
import useCategories from "../../category/hooks/useCategories";
import { NEW_QUIZ_FORM_DATA } from "../constants/formData";

const useNewQuizData = () => {
	// #region States
	const [data, updateData] = useFormData(NEW_QUIZ_FORM_DATA);
	// #endregion

	// #region Hooks
	const { categories, loading } = useCategories();
	// #endregion

	useEffect(() => {
		// No categories
		if (categories.length === 0) {
			updateData(NEW_QUIZ_FORM_DATA);
			return;
		}

		// Set default category
		updateData({ categoryId: categories[0].id });
	}, [categories, updateData]);

	return { loading, data, updateData };
};

export default useNewQuizData;
