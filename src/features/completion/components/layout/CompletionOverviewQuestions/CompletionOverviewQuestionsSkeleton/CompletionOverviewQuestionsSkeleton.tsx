import Section from "../../../../../../components/layout/Section/Section";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionOverviewQuestionsSkeleton.css";

const CompletionOverviewQuestionsSkeleton = () => {
	return (
		<Section>
			<div className="completionOverviewQuestionsSkeleton">
				<Skeleton width="100%" height="15rem" />
				<Skeleton width="100%" height="15rem" />
			</div>
		</Section>
	);
};

export default CompletionOverviewQuestionsSkeleton;
