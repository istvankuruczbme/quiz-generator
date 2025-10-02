import { FC, HTMLAttributes } from "react";
// Components
import { faBan } from "@fortawesome/free-solid-svg-icons";
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import Text from "../../../../components/ui/Text/Text";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
import QuizCard from "../../components/ui/QuizCard/QuizCard";
import CardContainer from "../../../../components/layout/CardContainer/CardContainer";
import IconTextSection from "../../../../components/layout/IconTextSection/IconTextSection";
import Suspense from "../../../../components/layout/Suspense/Suspense";
import Card from "../../../../components/ui/Card/Card";
// Hooks
import useUserQuizzes from "../../hooks/useUserQuizzes";
// CSS
import "./MyQuizzes.css";

type MyQuizzesProps = HTMLAttributes<HTMLDivElement>;

const MyQuizzes: FC<MyQuizzesProps> = () => {
	//#region Hooks
	const { quizzes, loading } = useUserQuizzes();
	//#endregion

	// #region Variables
	const draftQuizzes = quizzes.filter((quiz) => quiz.config.state === "DRAFT");
	const activeQuizzes = quizzes.filter((quiz) => quiz.config.state === "ACTIVE");
	// #endregion

	return (
		<Page>
			<Section>
				<BackButton to="/" variant="primary">
					Home
				</BackButton>
				<Page.Title mb="0">My quizzes</Page.Title>
			</Section>

			<Section>
				<LinkButton to="/new-quiz">Create quiz</LinkButton>
			</Section>

			<Section>
				<Section.Title>Draft quizzes</Section.Title>

				<Suspense loading={loading} fallback={<Card.Skeleton />}>
					{draftQuizzes.length === 0 && (
						<IconTextSection icon={faBan} text={<Text mb="0">No draft quizzes.</Text>} />
					)}
					<CardContainer>
						{draftQuizzes.map((quiz) => (
							<QuizCard key={quiz.id} quiz={quiz} />
						))}
					</CardContainer>
				</Suspense>
			</Section>

			{activeQuizzes.length > 0 && (
				<Section>
					<Section.Title>Active quizzes</Section.Title>
					<CardContainer>
						{activeQuizzes.map((quiz) => (
							<QuizCard key={quiz.id} quiz={quiz} />
						))}
					</CardContainer>
				</Section>
			)}
		</Page>
	);
};

export default MyQuizzes;
