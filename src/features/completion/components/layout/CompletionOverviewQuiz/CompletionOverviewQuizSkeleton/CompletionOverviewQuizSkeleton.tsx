import Section from "../../../../../../components/layout/Section/Section";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionOverviewQuizSkeleton.css";

const CompletionOverviewQuizSkeleton = () => {
	return (
		<Section>
			<div className="completionOverviewQuizSkeleton">
				<Skeleton width="5rem" height="5rem" />

				<div className="completionOverviewQuizSkeleton__right">
					<Skeleton width="10rem" height="1.5rem" />

					<div className="completionOverviewQuizSkeleton__description">
						<Skeleton width="10rem" height=".75rem" />
						<Skeleton width="5rem" height=".75rem" />
					</div>
				</div>
			</div>
		</Section>
	);
};

export default CompletionOverviewQuizSkeleton;
