import { useEffect, useState } from "react";
import { Category } from "../types/categoryTypes";
import getCategories from "../services/getCategories";
import useUser from "../../../contexts/UserContext/useUser";

const useCategories = () => {
	// #region States
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	// #endregion

	//#region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		// Check user
		if (user == null) {
			setCategories([]);
			setLoading(false);
			return;
		}

		(async function fetchCategories() {
			setLoading(true);

			try {
				const categories = await getCategories(user.id);
				setCategories(categories);

				setLoading(false);
			} catch (err) {
				console.log("Error fetching the categories.", err);
				setLoading(false);
			}
		})();
	}, [user]);

	return { categories, loading };
};

export default useCategories;
