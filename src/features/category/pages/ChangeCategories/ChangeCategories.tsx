import { ChangeEvent, FC, FormEvent, HTMLAttributes, useState } from "react";
// Comopnents
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import useDefaultCategoryIds from "../../../user/hooks/useDefaultCategoryIds";
import CategoriesContainer from "../../components/layout/CategoriesContainer/CategoriesContainer";
import ProfileBackButton from "../../../user/components/ui/ProfileBackButton/ProfileBackButton";
import CategoryCheckbox from "../../components/form/CategoryCheckbox/CategoryCheckbox";
import Text from "../../../../components/ui/Text/Text";
import Divider from "../../../../components/ui/Divider/Divider";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
import CategorySkeleton from "../../components/ui/CategorySkeleton/CategorySkeleton";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useCategories from "../../hooks/useCategories";
import useError from "../../../ui/error/hooks/useError";
import useFeedback from "../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import { useNavigate } from "react-router-dom";
// Functions
import updateUserCategories from "../../../user/services/updateUserCategories";
// CSS
import "./ChangeCategories.css";

type ChangeCategoriesProps = HTMLAttributes<HTMLDivElement>;

const ChangeCategories: FC<ChangeCategoriesProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	//#region Hooks
	const { user } = useUser();
	const { categories, loading: loadingCategories } = useCategories();
	const { categoryIds, setCategoryIds } = useDefaultCategoryIds();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	const navigate = useNavigate();
	//#endregion

	// #region Variables
	const hasUserCategories = !(categoryIds.length === 0);
	// #endregion

	// #region Functions
	function handleCategoryChange(e: ChangeEvent<HTMLInputElement>, id: string): void {
		if (e.target.checked) {
			setCategoryIds((categoryIds) => [...categoryIds, id]);
		} else {
			setCategoryIds((categoryIds) => categoryIds.filter((categoryId) => categoryId !== id));
		}
	}

	async function handleSubmitChangeCategoriesClick(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		// Check user
		if (user == null) return;

		setLoading(true);

		// Validate categories
		try {
			if (categoryIds.length === 0) throw new Error("user/categories-missing");
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Create user categories
			await updateUserCategories(categoryIds, user.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Categories updated.",
			});

			// Navigate to profile page
			navigate("/profile");
		} catch (err) {
			console.log("Error creating user categories.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<Page>
			<Section>
				<ProfileBackButton />

				<Page.Title>{hasUserCategories ? "Change" : "Select"} Categories</Page.Title>

				<Text variant="neutral-400" mb="0">
					Select the categories you are interested in. Based on your selection the perfect
					quizzes will be recommended for you.
				</Text>
			</Section>

			<Section>
				<Section.Title>Categories</Section.Title>

				<form onSubmit={handleSubmitChangeCategoriesClick}>
					<CategoriesContainer>
						{loadingCategories && (
							<>
								<CategorySkeleton />
								<CategorySkeleton />
								<CategorySkeleton />
								<CategorySkeleton />
								<CategorySkeleton />
								<CategorySkeleton />
								<CategorySkeleton />
							</>
						)}
						{!loadingCategories &&
							categories.map((category) => (
								<CategoryCheckbox
									key={category.id}
									id={category.id}
									icon={category.icon}
									name={category.name}
									checked={categoryIds.includes(category.id)}
									onChange={(e) => handleCategoryChange(e, category.id)}
								/>
							))}
					</CategoriesContainer>

					<Divider my="2rem" />

					<LoadingButton type="submit" centered loading={loading}>
						{hasUserCategories ? "Update" : "Select"} Categories
					</LoadingButton>
				</form>
			</Section>
		</Page>
	);
};

export default ChangeCategories;
