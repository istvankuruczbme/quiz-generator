import { HTMLAttributes } from "react";
import Skeleton from "../Skeleton";
import "./InputSkeleton.css";
import addPropClassName from "../../../../utils/addPropClassName";

type Props = HTMLAttributes<HTMLDivElement>;

const InputSkeleton = ({ className, ...rest }: Props) => {
	return (
		<div className={`inputSkeleton${addPropClassName(className)}`} {...rest}>
			<Skeleton width="33%" height="1.5rem" />
			<Skeleton width="100%" height="3rem" />
		</div>
	);
};

export default InputSkeleton;
