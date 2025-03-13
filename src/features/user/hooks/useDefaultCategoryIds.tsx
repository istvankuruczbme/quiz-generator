import { useEffect, useState } from "react";
import useUserCategories from "./useUserCategories";

const useDefaultCategoryIds = () => {
	// #region States
	const [categoryIds, setCategoryIds] = useState<string[]>([]);
	// #endregion

	// #region Hooks
	const { userCategories } = useUserCategories();
	// #endregion

	useEffect(() => {
		const userCategoryIds = userCategories.map((category) => category.id);
		setCategoryIds(userCategoryIds);
	}, [userCategories]);

	return { categoryIds, setCategoryIds };
};

export default useDefaultCategoryIds;
