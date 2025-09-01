import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import NewQuizSection from "../../components/layout/NewQuizSection/NewQuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import NewQuizForm from "../../components/form/NewQuizForm/NewQuizForm";
// CSS
import "./NewQuiz.css";

type NewQuizProps = HTMLAttributes<HTMLDivElement>;

const NewQuiz: FC<NewQuizProps> = () => {
	return (
		<Page>
			<NewQuizSection>
				<BackButton to="/my-quizzes" variant="primary">
					My quizzes
				</BackButton>
				<Page.Title mb="0">New quiz</Page.Title>
			</NewQuizSection>

			<NewQuizSection>
				<NewQuizForm />
			</NewQuizSection>
		</Page>
	);
};

export default NewQuiz;
