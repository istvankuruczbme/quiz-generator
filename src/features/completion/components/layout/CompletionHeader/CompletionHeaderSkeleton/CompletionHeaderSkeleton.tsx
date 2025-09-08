import Section from "../../../../../../components/layout/Section/Section";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionHeaderSkeleton.css";

const CompletionHeaderSkeleton = () => {
	return (
		<Section>
			<div className="completionHeaderSkeleton">
				<Skeleton height="2rem" width="8rem" />
				<Skeleton height="2rem" width="4rem" />
			</div>
		</Section>
	);
};

export default CompletionHeaderSkeleton;
