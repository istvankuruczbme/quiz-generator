import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes } from "react";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useCategories from "../../../../category/hooks/useCategories";
import useDefaultCategoryIds from "../../../hooks/useDefaultCategoryIds";
// Functions
import updateUserCategories from "../../../services/updateUserCategories";
// CSS
import "./ProfileCategoriesSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ProfileCategoriesSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileCategoriesSection: FC<ProfileCategoriesSectionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { categories } = useCategories();
	const { categoryIds, setCategoryIds } = useDefaultCategoryIds();
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

		// Validate categories
		try {
			if (categoryIds.length === 0) throw new Error("user/categories-missing");
		} catch (err) {
			console.log(err);
			return;
		}

		try {
			// Create user categories
			await updateUserCategories(categoryIds, user.id);

			console.log("Categories upadted.");
		} catch (err) {
			console.log("Error creating user categories.", err);
		}
	}
	// #endregion

	return (
		<div>
			<h3>Categories</h3>

			<form onSubmit={handleSubmitChangeCategoriesClick}>
				{categories.map((category) => (
					<Fragment key={category.id}>
						<input
							type="checkbox"
							id={category.id}
							checked={categoryIds.includes(category.id)}
							onChange={(e) => handleCategoryChange(e, category.id)}
						/>
						<label htmlFor={category.id}>
							<FontAwesomeIcon icon={category.icon} />
							{category.name}
						</label>
						<br />
					</Fragment>
				))}

				<button type="submit">Update categories</button>
			</form>
		</div>
	);
};

export default ProfileCategoriesSection;
