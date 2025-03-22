import { FC, HTMLAttributes } from "react";
// Components
import { Link } from "react-router-dom";
// CSS
import "./MyQuizzes.css";

type MyQuizzesProps = HTMLAttributes<HTMLDivElement>;

const MyQuizzes: FC<MyQuizzesProps> = () => {
	return (
		<div>
			<h1>My quizzes</h1>

			<Link to="/">
				<button tabIndex={-1}>Home</button>
			</Link>

			<h2>New quiz</h2>
			<Link to="/new-quiz">
				<button tabIndex={-1}>New quiz</button>
			</Link>

			<h2>List of quizzes</h2>
		</div>
	);
};

export default MyQuizzes;
