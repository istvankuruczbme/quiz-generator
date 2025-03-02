import { ChangeEvent, FC, FormEvent, Fragment, HTMLAttributes, useState } from "react";
import useCategories from "../../../category/hooks/useCategories";
import "./ProfileCategories.css";

type ProfileCategoriesProps = HTMLAttributes<HTMLDivElement>;

const ProfileCategories: FC<ProfileCategoriesProps> = () => {
	// #region States
	const [categoryIds, setCategoryIds] = useState<string[]>([]);
	// #endregion

	//#region Hooks
	const { categories } = useCategories();
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

export default ProfileCategories;
