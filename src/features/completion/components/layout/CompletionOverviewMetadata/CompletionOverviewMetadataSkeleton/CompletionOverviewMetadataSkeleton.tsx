import Section from "../../../../../../components/layout/Section/Section";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionOverviewMetadataSkeleton.css";

const CompletionOverviewMetadataSkeleton = () => {
	return (
		<Section>
			<div className="completionOverviewMetadataSkeleton">
				<div className="completionOverviewMetadataSkeleton__points">
					<Skeleton width="5rem" height="2rem" />
					<Skeleton width="5rem" height="1rem" />
				</div>
			</div>
		</Section>
	);
};

export default CompletionOverviewMetadataSkeleton;
