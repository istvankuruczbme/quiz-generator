import { useEffect, useState } from "react";
import { Category } from "../../category/types/categoryTypes";
import useUser from "../../../contexts/UserContext/useUser";
import getUserCategories from "../services/getUserCategories";

const useUserCategories = () => {
	// #region States
	const [userCategories, setUserCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	//#endregion

	// #region Hooks
	const { user } = useUser();
	//#endregion

	useEffect(() => {
		if (user == null) {
			setUserCategories([]);
			setLoading(false);
			return;
		}

		(async function fetchUserCategories() {
			setLoading(true);

			try {
				// Get user categories
				const categories = await getUserCategories(user.id);

				// Update states
				setUserCategories(categories);
				setLoading(false);
			} catch (err) {
				console.log("Error fetching the user categories from DB.", err);
				setLoading(false);
			}
		})();
	}, [user]);

	return { userCategories, loading };
};

export default useUserCategories;
