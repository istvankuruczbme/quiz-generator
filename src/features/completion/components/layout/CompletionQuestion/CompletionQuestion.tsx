import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import useCompletionPublic from "../../../contexts/CompletionPublicContext/useCompletionPublic";
import CompletionQuestionSkeleton from "./CompletionQuestionSkeleton/CompletionQuestionSkeleton";
import "./CompletionQuestion.css";

const CompletionQuestion = () => {
	// #region Hooks
	const { loading, question, questionNumber } = useCompletionPublic();
	// #endregion

	return (
		<Suspense loading={loading} fallback={<CompletionQuestionSkeleton />}>
			<Section>
				<div className="completionQuestion">
					<div className="completionQuestion__question">
						<span className="completionQuestion__question__number">{questionNumber}.</span>

						<span className="completionQuestion__question__text">{question?.text}</span>
					</div>

					{question?.photoUrl && (
						<img src={question.photoUrl ?? undefined} className="completionQuestion__photo" />
					)}
				</div>
			</Section>
		</Suspense>
	);
};

export default CompletionQuestion;
