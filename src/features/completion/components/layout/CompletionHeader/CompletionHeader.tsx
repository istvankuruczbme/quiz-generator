import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import Tooltip from "../../../../../components/ui/Tooltip/Tooltip";
import formatSignedValue from "../../../../../utils/formatting/formatSignedValue";
import useCompletionPublic from "../../../contexts/CompletionPublicContext/useCompletionPublic";
import CompletionHeaderSkeleton from "./CompletionHeaderSkeleton/CompletionHeaderSkeleton";
import "./CompletionHeader.css";

const CompletionHeader = () => {
	// #region Hooks
	const { completion, loading, question, questionNumber } = useCompletionPublic();
	// #endregion

	return (
		<Suspense loading={loading} fallback={<CompletionHeaderSkeleton />}>
			<Section>
				<header className="completionHeader">
					<div className="completionHeader__points">
						<span className="completionHeader__points__label">Points:</span>

						<div className="completionHeader__points__container">
							<span className="completionHeader__points__item completionHeader__points__item--correct">
								{formatSignedValue(question?.points.correct ?? 0)}

								<Tooltip>
									<Tooltip.Text>Points for correct answer</Tooltip.Text>
								</Tooltip>
							</span>

							<span className="completionHeader__points__item completionHeader__points__item--wrong">
								{formatSignedValue(question?.points.wrong ?? 0)}

								<Tooltip>
									<Tooltip.Text>Points for wrong answer</Tooltip.Text>
								</Tooltip>
							</span>

							<span className="completionHeader__points__item completionHeader__points__item--empty">
								{formatSignedValue(question?.points.empty ?? 0)}

								<Tooltip>
									<Tooltip.Text>Points for partially correct answer</Tooltip.Text>
								</Tooltip>
							</span>
						</div>
					</div>

					<div className="completionHeader__questions">
						<span className="completionHeader__questions__current">{questionNumber}</span>/
						<span className="completionHeader__questions__total">
							{completion?.quiz.questions.length}
						</span>
					</div>
				</header>
			</Section>
		</Suspense>
	);
};

export default CompletionHeader;
