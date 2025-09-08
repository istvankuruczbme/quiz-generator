import Section from "../../../../../../components/layout/Section/Section";
import Skeleton from "../../../../../../components/ui/Skeleton/Skeleton";
import "./CompletionQuestionSkeleton.css";

const CompletionQuestionSkeleton = () => {
	return (
		<Section>
			<div className="completionQuestionSkeleton">
				<div className="completionQuestionSkeleton__text">
					<Skeleton height="2rem" width="100%" />
					<Skeleton height="2rem" width="40%" />
				</div>

				<Skeleton height="10rem" width="50%" className="completionQuestionSkeleton__photo" />
			</div>
		</Section>
	);
};

export default CompletionQuestionSkeleton;
