import { forwardRef, SelectHTMLAttributes } from "react";
import Select from "../../../../../components/form/Select/Select";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import InputSkeleton from "../../../../../components/ui/Skeleton/InputSkeleton/InputSkeleton";
import useCategories from "../../../hooks/useCategories";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./CategorySelect.css";

type CategorySelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const CategorySelect = forwardRef<HTMLSelectElement, CategorySelectProps>(
	({ className, ...rest }, ref) => {
		//#region Hooks
		const { categories, loading } = useCategories();
		//#endregion

		// #region Variables
		const categoryOptions = categories.map((category) => ({
			id: category.id,
			text: category.name,
		}));
		// #endregion

		return (
			<Suspense loading={loading} fallback={<InputSkeleton />}>
				<Select
					label="Category"
					options={categoryOptions}
					className={`categorySelect${addPropClassName(className)}`}
					{...rest}
					ref={ref}
				/>
			</Suspense>
		);
	}
);

export default CategorySelect;
