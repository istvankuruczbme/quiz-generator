import { HTMLAttributes } from "react";
import "./CardSkeleton.css";
import Skeleton from "../../Skeleton/Skeleton";

type Props = HTMLAttributes<HTMLDivElement>;

const CardSkeleton = ({ className }: Props) => {
	return <Skeleton width="300px" height="26.5rem" className={className} />;
};

export default CardSkeleton;
