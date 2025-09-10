import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import calculateQuizTotalPoints from "../../../../quiz/utils/calculateQuizTotalPoints";
import useCompletionPrivate from "../../../contexts/CompletionPrivateContext/useCompletionPrivate";
import CompletionOverviewMetadataSkeleton from "./CompletionOverviewMetadataSkeleton/CompletionOverviewMetadataSkeleton";
import calculateCompletionPoints from "../../../utils/calculateCompletionPoints";
import "./CompletionOverviewMetadata.css";

const CompletionOverviewMetadata = () => {
	// #region Hooks
	const { completion, loading } = useCompletionPrivate();
	// #endregion

	// #region Constants
	const totalPoints = calculateQuizTotalPoints(completion?.quiz.questions ?? []);
	const completionPoints = calculateCompletionPoints(completion?.quiz.questions ?? []);
	//#endregion

	return (
		<Suspense loading={loading} fallback={<CompletionOverviewMetadataSkeleton />}>
			<Section>
				<div className="completionOverviewMetadata">
					<div className="completionOverviewMetadata__time">
						<div className="completionOverviewMetadata__time__row">
							<span className="completionOverviewMetadata__time__row__label">Started:</span>
							<span className="completionOverviewMetadata__time__row__value">
								{new Date(completion?.createdAt ?? 0).toLocaleString()}
							</span>
						</div>
						<div className="completionOverviewMetadata__time__row">
							<span className="completionOverviewMetadata__time__row__label">Finished:</span>
							<span className="completionOverviewMetadata__time__row__value">
								{new Date(completion?.finishedAt ?? 0).toLocaleString()}
							</span>
						</div>
					</div>

					<div className="completionOverviewMetadata__points">
						<span className="completionOverviewMetadata__points__value">
							{completionPoints}/{totalPoints}
						</span>
						<span className="completionOverviewMetadata__points__label">points</span>
					</div>
				</div>
			</Section>
		</Suspense>
	);
};

export default CompletionOverviewMetadata;
