import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import useQuizSearch from "../../../contexts/QuizSearchContext/useQuizSearch";
import QuizCard from "../../ui/QuizCard/QuizCard";
import "./BrowseQuizzes.css";

const BrowseQuizzes = () => {
	// #region Hooks
	const { quizzes, loading } = useQuizSearch();
	// #endregion

	return (
		<Section>
			<div className="browseQuizzes">
				<Suspense loading={loading} fallback={<p>Loading search result...</p>}>
					{quizzes.map((quiz) => (
						<QuizCard key={quiz.id} quiz={quiz} />
					))}
				</Suspense>
			</div>
		</Section>
	);
};

export default BrowseQuizzes;
