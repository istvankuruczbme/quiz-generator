import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import Suspense from "../../../../components/layout/Suspense/Suspense";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import QuizContainer from "../../../quiz/components/layout/QuizContainer/QuizContainer";
import CompletionCard from "../../components/ui/CompletionCard/CompletionCard";
import CompletionCardSkeleton from "../../components/ui/CompletionCard/CompletionCardSkeleton/CompletionCardSkeleton";
import useUserCompletions from "../../hooks/useUserCompletions";
import "./MyCompletions.css";

const MyCompletions = () => {
	// #region Hooks
	const { completions, loading } = useUserCompletions();
	// #endregion

	// #region Constants
	const activeCompletions = completions.filter((completion) => completion.finishedAt != null);
	const finishedCompletions = completions.filter((completion) => completion.finishedAt == null);
	// #endregion

	return (
		<Page>
			<Section>
				<BackButton to="/" variant="primary">
					Home
				</BackButton>
				<Page.Title mb="0">My completions</Page.Title>
			</Section>

			<Section>
				<Section.Title>Active completions</Section.Title>

				<Suspense
					loading={loading}
					fallback={
						<>
							<CompletionCardSkeleton />
							<CompletionCardSkeleton />
						</>
					}
				>
					<QuizContainer>
						{activeCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</QuizContainer>
				</Suspense>
			</Section>

			<Section>
				<Section.Title>Finished completions</Section.Title>

				<Suspense
					loading={loading}
					fallback={
						<>
							<CompletionCardSkeleton />
							<CompletionCardSkeleton />
						</>
					}
				>
					<QuizContainer>
						{finishedCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</QuizContainer>
				</Suspense>
			</Section>
		</Page>
	);
};

export default MyCompletions;
