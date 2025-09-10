import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import defaultQuizPhotoUrl from "../../../../quiz/assets/defaultQuizPhotoUrl";
import QuizCategory from "../../../../quiz/components/ui/QuizCard/QuizCategory/QuizCategory";
import useCompletionPrivate from "../../../contexts/CompletionPrivateContext/useCompletionPrivate";
import "./CompletionOverviewQuiz.css";
import CompletionOverviewQuizSkeleton from "./CompletionOverviewQuizSkeleton/CompletionOverviewQuizSkeleton";

const CompletionOverviewQuiz = () => {
	//#region Hooks
	const { completion, loading } = useCompletionPrivate();
	// #endregion

	return (
		<Suspense loading={loading} fallback={<CompletionOverviewQuizSkeleton />}>
			<Section>
				<div className="completionOverviewQuiz">
					<img
						src={completion?.quiz.photoUrl ?? defaultQuizPhotoUrl}
						alt={completion?.quiz.title}
						className="completionOverviewQuiz__img"
					/>

					<div className="completionOverviewQuiz__main">
						<div className="completionOverviewQuiz__main__top">
							<h3 className="completionOverviewQuiz__title">{completion?.quiz.title}</h3>
							{completion && <QuizCategory category={completion.quiz.category} />}
						</div>

						<span className="completionOverviewQuiz__main__description">
							{completion?.quiz.description}
						</span>
					</div>
				</div>
			</Section>
		</Suspense>
	);
};

export default CompletionOverviewQuiz;
