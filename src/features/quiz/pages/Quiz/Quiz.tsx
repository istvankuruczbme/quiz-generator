import { FC, HTMLAttributes } from "react";
// Components
import { Link } from "react-router-dom";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useQuizSummary from "../../hooks/useQuizSummary";
// Functions
import checkQuizWriteAccess from "../../utils/checkQuizWriteAccess";
// CSS
import "./Quiz.css";

type QuizProps = HTMLAttributes<HTMLDivElement>;

const Quiz: FC<QuizProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { quizSummary } = useQuizSummary();
	//#endregion

	if (quizSummary == null || user == null) return null;
	return (
		<div>
			<h1>{quizSummary.title}</h1>
			<p>{JSON.stringify(quizSummary)}</p>

			<div>
				<Link to="complete">
					<button tabIndex={-1}>Start quiz</button>
				</Link>
				{checkQuizWriteAccess(quizSummary, user) && (
					<>
						<hr />
						<Link to="edit">
							<button tabIndex={-1}>Edit</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Quiz;
