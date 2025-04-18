import { FC, HTMLAttributes } from "react";
// Components
import EditQuizProvider from "../../contexts/EditQuizContext/EditQuizProvider";
import QuizPrivateProvider from "../../contexts/QuizPrivateContext/QuizPrivateProvider";
import Page from "../../../../components/layout/Page/Page";
import EditQuizGenerateQuestionsSection from "../../components/layout/EditQuizGenerateQuestionsSection/EditQuizGenerateQuestionsSection";
import EditQuizSection from "../../components/layout/EditQuizSection/EditQuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import EditQuizDataSection from "../../components/layout/EditQuizDataSection/EditQuizDataSection";
import EditQuizConfigSection from "../../components/layout/EditQuizConfigSection/EditQuizConfigSection";
import EditQuizQuestionsSection from "../../components/layout/EditQuizQuestionsSection/EditQuizQuestionsSection";
import EditQuizDeleteSection from "../../components/layout/EditQuizDeleteSection/EditQuizDeleteSection";
import EditQuizFinishSection from "../../components/layout/EditQuizFinishSection/EditQuizFinishSection";
// CSS
import "./EditQuiz.css";

type EditQuizProps = HTMLAttributes<HTMLDivElement>;

const EditQuiz: FC<EditQuizProps> = () => {
	return (
		<EditQuizProvider>
			<QuizPrivateProvider>
				<Page>
					<EditQuizSection>
						<BackButton to="/my-quizzes" variant="primary">
							My quizzes
						</BackButton>
						<Page.Title mb="0">Edit quiz</Page.Title>
					</EditQuizSection>

					<EditQuizDataSection />

					<EditQuizConfigSection />

					<EditQuizGenerateQuestionsSection />

					<EditQuizQuestionsSection />

					<EditQuizFinishSection />

					<EditQuizDeleteSection />
				</Page>
			</QuizPrivateProvider>
		</EditQuizProvider>
	);
};

export default EditQuiz;
