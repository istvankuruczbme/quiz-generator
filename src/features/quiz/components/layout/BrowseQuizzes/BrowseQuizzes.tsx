import { faBan } from "@fortawesome/free-solid-svg-icons";
import IconTextSection from "../../../../../components/layout/IconTextSection/IconTextSection";
import Section from "../../../../../components/layout/Section/Section";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import CardSkeleton from "../../../../../components/ui/Card/CardSkeleton/CardSkeleton";
import CardContainer from "../../../../../components/layout/CardContainer/CardContainer";
import QuizCard from "../../ui/QuizCard/QuizCard";
import useQuizSearch from "../../../contexts/QuizSearchContext/useQuizSearch";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import "./BrowseQuizzes.css";

const BrowseQuizzes = () => {
	// #region Hooks
	const { quizzes, loading, data, updateData } = useQuizSearch();
	// #endregion

	return (
		<Section>
			<Suspense
				loading={loading}
				fallback={
					<CardContainer>
						<CardSkeleton />
						<CardSkeleton />
						<CardSkeleton />
					</CardContainer>
				}
			>
				{quizzes.length === 0 && <IconTextSection icon={faBan} text="No quizzes found." />}
				<CardContainer>
					{quizzes.map((quiz) => (
						<QuizCard key={quiz.id} quiz={quiz} />
					))}
				</CardContainer>

				{data.limit === quizzes.length && (
					<LoadingButton
						centered
						className="browseQuizzes__loadMoreButton"
						loading={loading}
						onClick={() => updateData({ limit: data.limit + 12 })}
					>
						Load more quizzes
					</LoadingButton>
				)}
			</Suspense>
		</Section>
	);
};

export default BrowseQuizzes;
