import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes, useState } from "react";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
// Functions
import updateUserCategories from "../../../user/services/updateUserCategories";
// CSS
import "./SelectCategories.css";

type SelectCategoriesProps = HTMLAttributes<HTMLDivElement>;

const SelectCategories: FC<SelectCategoriesProps> = () => {
	// #region States
	const [categoryIds, setCategoryIds] = useState<string[]>([]);
	// #endregion

	//#region Hooks
	const { user } = useUser();
	const { categories } = useCategories();
	const navigate = useNavigate();
	//#endregion

	// #region Functions
	function handleCategoryChange(e: ChangeEvent<HTMLInputElement>, id: string): void {
		if (e.target.checked) {
			setCategoryIds((categoryIds) => [...categoryIds, id]);
		} else {
			setCategoryIds((categoryIds) => categoryIds.filter((categoryId) => categoryId !== id));
		}
	}

	async function handleSubmitSelectCategoriesClick(e: FormEvent<HTMLFormElement>): Promise<void> {
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

			// Navigate to home page
			navigate("/");
		} catch (err) {
			console.log("Error creating user categories.", err);
		}
	}
	//#endregion

	return (
		<div>
			<h1>Profile Categories</h1>

			<form onSubmit={handleSubmitSelectCategoriesClick}>
				{categories.map((category) => (
					<Fragment key={category.id}>
						<input
							type="checkbox"
							id={category.id}
							checked={categoryIds.includes(category.id)}
							onChange={(e) => handleCategoryChange(e, category.id)}
						/>
						<label htmlFor={category.id}>{category.name}</label>
						<br />
					</Fragment>
				))}

				<button type="submit">Select Categories</button>
			</form>
		</div>
	);
};

export default SelectCategories;
