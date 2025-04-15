import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import Text from "../../../../components/ui/Text/Text";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
// Hooks
import useUserQuizzes from "../../hooks/useUserQuizzes";
// CSS
import "./MyQuizzes.css";
import QuizCard from "../../components/ui/QuizCard/QuizCard";
import QuizContainer from "../../components/layout/QuizContainer/QuizContainer";
import Skeleton from "../../../../components/ui/Skeleton/Skeleton";

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
				<Section.Title>New quiz</Section.Title>

				<Text variant="neutral-400">Click on the button below to create a new quiz.</Text>
				<LinkButton to="/new-quiz">Create quiz</LinkButton>
			</Section>

			<Section>
				<Section.Title>Draft quizzes</Section.Title>

				{draftQuizzes.length === 0 && <Text>No draft quizzes.</Text>}
				<QuizContainer>
					{loading && (
						<>
							<Skeleton type="rect" width="18rem" height="26.5rem" />
							<Skeleton type="rect" width="18rem" height="26.5rem" />
						</>
					)}
					{draftQuizzes.length > 0 &&
						draftQuizzes.map((quiz) => <QuizCard key={quiz.id} quizSummary={quiz} />)}
				</QuizContainer>
			</Section>

			{activeQuizzes.length > 0 && (
				<Section>
					<Section.Title>Active quizzes</Section.Title>
					<QuizContainer>
						{activeQuizzes.map((quiz) => (
							<QuizCard key={quiz.id} quizSummary={quiz} />
						))}
					</QuizContainer>
				</Section>
			)}
		</Page>
	);
};

export default MyQuizzes;
