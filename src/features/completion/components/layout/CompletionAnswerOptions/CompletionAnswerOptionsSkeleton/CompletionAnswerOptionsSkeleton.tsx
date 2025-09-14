import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionAnswerOptionsSkeleton.css";

const CompletionAnswerOptionsSkeleton = () => {
	return (
		<>
			<Skeleton width="100%" height="4rem" />
			<Skeleton width="100%" height="4rem" />
			<Skeleton width="100%" height="4rem" />
		</>
	);
};

export default CompletionAnswerOptionsSkeleton;
