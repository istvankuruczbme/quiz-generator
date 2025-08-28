import { FC, HTMLAttributes } from "react";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";
import "./CategorySkeleton.css";

type CategorySkeletonProps = HTMLAttributes<HTMLDivElement>;

const CategorySkeleton: FC<CategorySkeletonProps> = () => {
	return <Skeleton type="circle" width="160px" height="40px" />;
};

export default CategorySkeleton;
