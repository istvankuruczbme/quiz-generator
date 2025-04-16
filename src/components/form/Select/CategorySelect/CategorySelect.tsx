import { forwardRef, SelectHTMLAttributes } from "react";
import Select from "../Select";
import useCategories from "../../../../features/category/hooks/useCategories";
import addPropClassName from "../../../../utils/addPropClassName";
import "./CategorySelect.css";

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
	({ className, ...rest }, ref) => {
		//#region Hooks
		const { categories } = useCategories();
		//#endregion

		// #region Variables
		const categoryOptions = categories.map((category) => ({
			id: category.id,
			text: category.name,
		}));
		// #endregion

		return (
			<Select
				label="Category"
				options={categoryOptions}
				className={`categorySelect${addPropClassName(className)}`}
				{...rest}
				ref={ref}
			/>
		);
	}
);

export default CategorySelect;
