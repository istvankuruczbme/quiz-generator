import { useEffect } from "react";
import useUserCategories from "./useUserCategories";
import useFormData from "../../../hooks/form/useFormData";
import { EDIT_USER_CATEGORIES_FORM_DATA } from "../constants/formData";

const useEditUserCategoriesData = () => {
	// #region States
	const [data, updateData] = useFormData(EDIT_USER_CATEGORIES_FORM_DATA);
	// #endregion

	// #region Hooks
	const { categories, loading } = useUserCategories();
	// #endregion

	useEffect(() => {
		// Check categories
		if (categories.length === 0) return;

		// Get category IDs
		const categoryIds = categories.map((category) => category.id);

		// Update form data
		updateData({ categoryIds });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories]);

	return { categories, loading, data, updateData };
};

export default useEditUserCategoriesData;
