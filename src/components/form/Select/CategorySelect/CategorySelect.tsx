import { forwardRef, SelectHTMLAttributes } from "react";
import useCategories from "../../../../features/category/hooks/useCategories";
import "./CategorySelect.css";

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>((props, ref) => {
	//#region Hooks
	const { categories } = useCategories();
	//#endregion

	return (
		<div>
			<label htmlFor={props.id}>Category</label>
			<select required {...props} ref={ref}>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
});

export default CategorySelect;
