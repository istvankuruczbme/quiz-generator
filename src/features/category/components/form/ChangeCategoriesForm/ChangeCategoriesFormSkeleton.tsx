import Divider from "../../../../../components/ui/Divider/Divider";
import ButtonSkeleton from "../../../../../components/ui/Skeleton/ButtonSkeleton/ButtonSkeleton";
import CategoriesSkeleton from "../../../../user/components/ui/CategoriesSkeleton/CategoriesSkeleton";

const ChangeCategoriesFormSkeleton = () => {
	return (
		<div>
			<CategoriesSkeleton count={10} />
			<Divider my="2rem" />
			<ButtonSkeleton />
		</div>
	);
};

export default ChangeCategoriesFormSkeleton;
