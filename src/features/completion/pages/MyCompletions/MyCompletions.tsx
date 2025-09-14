import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import Suspense from "../../../../components/layout/Suspense/Suspense";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import CardContainer from "../../../../components/layout/CardContainer/CardContainer";
import CompletionCard from "../../components/ui/CompletionCard/CompletionCard";
import useUserCompletions from "../../hooks/useUserCompletions";
import "./MyCompletions.css";
import Card from "../../../../components/ui/Card/Card";
import { useMemo } from "react";

const MyCompletions = () => {
	// #region Hooks
	const { completions, loading } = useUserCompletions();
	// #endregion

	// #region Constants
	const activeCompletions = useMemo(
		() => completions.filter((completion) => completion.finishedAt == null),
		[completions]
	);
	const finishedCompletions = useMemo(
		() => completions.filter((completion) => completion.finishedAt != null),
		[completions]
	);
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

				<CardContainer>
					<Suspense
						loading={loading}
						fallback={
							<>
								<Card.Skeleton />
								<Card.Skeleton />
							</>
						}
					>
						{activeCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</Suspense>
				</CardContainer>
			</Section>

			<Section>
				<Section.Title>Finished completions</Section.Title>

				<CardContainer>
					<Suspense
						loading={loading}
						fallback={
							<>
								<Card.Skeleton />
								<Card.Skeleton />
							</>
						}
					>
						{finishedCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</Suspense>
				</CardContainer>
			</Section>
		</Page>
	);
};

export default MyCompletions;
