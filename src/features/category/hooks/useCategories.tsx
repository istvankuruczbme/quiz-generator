import { useEffect, useState } from "react";
import { Category } from "../types/categoryTypes";
import getCategories from "../services/getCategories";
import useUser from "../../../contexts/UserContext/useUser";

const useCategories = () => {
	// #region States
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false);
	// #endregion

	//#region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		// Check user
		if (user == null) {
			setCategories([]);
			return;
		}

		(async function fetchCategories() {
			setLoading(true);

			try {
				// Get categories
				const categories = await getCategories();

				// Update categories
				setCategories(categories);
			} catch (err) {
				console.log("Error fetching the categories.", err);
			} finally {
				setLoading(false);
			}
		})();
	}, [user]);

	return { categories, loading };
};

export default useCategories;
