import { FC, HTMLAttributes } from "react";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Input from "../../../../../components/form/Input/Input";
import useNewQuestion from "../../../contexts/EditQuestionContext/useEditQuestion";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuestionPoints.css";
import convertNumberToInputValue from "../../../../../utils/dom/convertNumberToInputValue";

type QuestionPointsProps = HTMLAttributes<HTMLDetailsElement>;

const QuestionPoints: FC<QuestionPointsProps> = ({ className }) => {
	// #region Hooks
	const { correct, setCorrect, wrong, setWrong, empty, setEmpty } = useNewQuestion();
	//#endregion

	return (
		<Accordion className={`questionPoints${addPropClassName(className)}`}>
			<Accordion.Header>Points</Accordion.Header>

			<Accordion.Body>
				<div className="questionPoints__inputs">
					<Input
						type="number"
						label="Correct"
						id="newQuestionPointsCorrect"
						placeholder="Correct"
						required
						full
						value={convertNumberToInputValue(correct)}
						onChange={(e) => setCorrect(e.target.valueAsNumber)}
					/>
					<Input
						type="number"
						label="Wrong"
						id="newQuestionPointsWrong"
						placeholder="Wrong"
						required
						full
						value={convertNumberToInputValue(wrong)}
						onChange={(e) => setWrong(e.target.valueAsNumber)}
					/>
					<Input
						type="number"
						label="Empty"
						id="newQuestionPointsEmpty"
						placeholder="Empty"
						required
						full
						value={convertNumberToInputValue(empty)}
						onChange={(e) => setEmpty(e.target.valueAsNumber)}
					/>
				</div>
			</Accordion.Body>
		</Accordion>
	);
};

export default QuestionPoints;
