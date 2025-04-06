import { FC, HTMLAttributes } from "react";
// Components
import { Link } from "react-router-dom";
import QuizPrivateProvider from "../../contexts/QuizPrivateContext/QuizPrivateProvider";
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
		<QuizPrivateProvider>
			<h1>Edit quiz</h1>

			<Link to="/my-quizzes">
				<button tabIndex={-1}>My quizzes</button>
			</Link>

			<EditQuizDataSection />

			<EditQuizConfigSection />

			<EditQuizQuestionsSection />

			<EditQuizFinishSection />

			<EditQuizDeleteSection />
		</QuizPrivateProvider>
	);
};

export default EditQuiz;
