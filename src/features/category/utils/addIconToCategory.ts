import categoryIcons from "../assets/categoryIcons";
import { Category, CategoryResponse } from "../types/categoryTypes";

export default function addIconToCategory(category: CategoryResponse): Category {
	return {
		...category,
		icon: categoryIcons[category.name],
	};
}
