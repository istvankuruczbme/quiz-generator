import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import useCompletionPrivate from "../../../contexts/CompletionPrivateContext/useCompletionPrivate";
import CompletionOverviewQuestion from "../../ui/CompletionOverviewQuestion/CompletionOverviewQuestion";
import "./CompletionOverviewQuestions.css";
import CompletionOverviewQuestionsSkeleton from "./CompletionOverviewQuestionsSkeleton/CompletionOverviewQuestionsSkeleton";

const CompletionOverviewQuestions = () => {
	// #region Hooks
	const { completion, loading } = useCompletionPrivate();
	// #endregion

	return (
		<Suspense loading={loading} fallback={<CompletionOverviewQuestionsSkeleton />}>
			<Section>
				<div className="completionOverviewQuestions">
					{completion?.quiz.questions.map((question) => (
						<CompletionOverviewQuestion key={question.id} question={question} />
					))}
				</div>
			</Section>
		</Suspense>
	);
};

export default CompletionOverviewQuestions;
