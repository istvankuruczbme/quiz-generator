import { ChangeEvent, FormEvent } from "react";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import useCategories from "../../../hooks/useCategories";
import useEditUserCategoriesData from "../../../../user/hooks/useEditUserCategoriesData";
import useUpdateUserCategories from "../../../../user/hooks/useUpdateUserCategories";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import CategoriesContainer from "../../layout/CategoriesContainer/CategoriesContainer";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import Divider from "../../../../../components/ui/Divider/Divider";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";

const ChangeCategoriesForm = () => {
	//#region Hooks
	const { categories, loading: loadingCategories } = useCategories();
	const {
		categories: userCategories,
		loading: loadingUserCategories,
		data,
		updateData,
	} = useEditUserCategoriesData();
	const { mutateAsync, loading } = useUpdateUserCategories();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	// #region Variables
	const hasUserCategories = userCategories.length > 0;
	const loadingData = loadingCategories || loadingUserCategories;
	// #endregion

	// #region Functions
	function handleCategoryChange(e: ChangeEvent<HTMLInputElement>, id: string): void {
		if (e.target.checked) {
			const newCategoryIds = [...data.categoryIds, id];
			updateData({ categoryIds: newCategoryIds });
		} else {
			const newCategoryIds = data.categoryIds.filter((categoryId) => categoryId !== id);
			updateData({ categoryIds: newCategoryIds });
		}
	}

	async function handleSubmitChangeCategoriesClick(e: FormEvent): Promise<void> {
		e.preventDefault();

		try {
			// Create user categories
			await mutateAsync({ categoryIds: data.categoryIds });

			// Show feedback
			setFeedback({
				type: "success",
				message: "Categories updated.",
			});
		} catch (err) {
			setError(err);
		}
	}
	// #endregion

	return (
		<Suspense loading={loadingData} fallback={<ChangeCategoriesForm />}>
			<form onSubmit={handleSubmitChangeCategoriesClick}>
				<CategoriesContainer>
					{categories.map((category) => (
						<CategoryCheckbox
							key={category.id}
							id={category.id}
							icon={category.icon}
							name={category.name}
							checked={data.categoryIds.includes(category.id)}
							onChange={(e) => handleCategoryChange(e, category.id)}
						/>
					))}
				</CategoriesContainer>

				<Divider my="2rem" />

				{!loadingCategories && (
					<LoadingButton type="submit" centered loading={loading}>
						{hasUserCategories ? "Update" : "Select"} Categories
					</LoadingButton>
				)}
			</form>
		</Suspense>
	);
};

export default ChangeCategoriesForm;
