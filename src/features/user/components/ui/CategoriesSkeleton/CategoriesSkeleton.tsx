import CategoriesContainer from "../../../../category/components/layout/CategoriesContainer/CategoriesContainer";
import CategorySkeleton from "../../../../category/components/ui/CategorySkeleton/CategorySkeleton";

type Props = {
	count?: number;
};

const CategoriesSkeleton = ({ count = 3 }: Props) => {
	return (
		<CategoriesContainer>
			{new Array(count).fill(null).map((_, i) => (
				<CategorySkeleton key={i} />
			))}
		</CategoriesContainer>
	);
};

export default CategoriesSkeleton;
