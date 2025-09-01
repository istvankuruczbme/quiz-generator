import { FC, HTMLAttributes } from "react";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Input from "../../../../../components/form/Input/Input";
import useEditQuestion from "../../../contexts/EditQuestionContext/useEditQuestion";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./QuestionPoints.css";

type QuestionPointsProps = HTMLAttributes<HTMLDetailsElement>;

const QuestionPoints: FC<QuestionPointsProps> = ({ className }) => {
	// #region Hooks
	const { data, updateData } = useEditQuestion();
	//#endregion

	return (
		<Accordion className={`questionPoints${addPropClassName(className)}`}>
			<Accordion.Header>Points</Accordion.Header>

			<Accordion.Body>
				<div className="questionPoints__inputs">
					<Input
						type="number"
						label="Correct"
						id="editQuestionPointsCorrect"
						placeholder="Correct"
						required
						full
						value={data.correct}
						onChange={(e) => updateData({ correct: e.target.value })}
					/>
					<Input
						type="number"
						label="Wrong"
						id="editQuestionPointsWrong"
						placeholder="Wrong"
						required
						full
						value={data.wrong}
						onChange={(e) => updateData({ wrong: e.target.value })}
					/>
					<Input
						type="number"
						label="Empty"
						id="editQuestionPointsEmpty"
						placeholder="Empty"
						required
						full
						value={data.empty}
						onChange={(e) => updateData({ empty: e.target.value })}
					/>
				</div>
			</Accordion.Body>
		</Accordion>
	);
};

export default QuestionPoints;
