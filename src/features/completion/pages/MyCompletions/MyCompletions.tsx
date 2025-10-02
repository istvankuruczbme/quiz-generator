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
import IconTextSection from "../../../../components/layout/IconTextSection/IconTextSection";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import Text from "../../../../components/ui/Text/Text";

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

				<Suspense loading={loading} fallback={<Card.Skeleton />}>
					{activeCompletions.length === 0 && (
						<IconTextSection icon={faBan} text={<Text mb="0">No active completions.</Text>} />
					)}
					<CardContainer>
						{activeCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</CardContainer>
				</Suspense>
			</Section>

			<Section>
				<Section.Title>Finished completions</Section.Title>

				<Suspense loading={loading} fallback={<Card.Skeleton />}>
					{finishedCompletions.length === 0 && (
						<IconTextSection
							icon={faBan}
							text={<Text mb="0">No finished completions.</Text>}
						/>
					)}
					<CardContainer>
						{finishedCompletions.map((completion) => (
							<CompletionCard key={completion.id} completion={completion} />
						))}
					</CardContainer>
				</Suspense>
			</Section>
		</Page>
	);
};

export default MyCompletions;
