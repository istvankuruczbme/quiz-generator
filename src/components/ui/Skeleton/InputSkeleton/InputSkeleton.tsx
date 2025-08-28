import Skeleton from "../Skeleton";
import "./InputSkeleton.css";

const InputSkeleton = () => {
	return (
		<div className="inputSkeleton">
			<Skeleton width="33%" height="1.5rem" />
			<Skeleton width="100%" height="3rem" />
		</div>
	);
};

export default InputSkeleton;
