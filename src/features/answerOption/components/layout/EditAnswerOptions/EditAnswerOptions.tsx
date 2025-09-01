import { FC, HTMLAttributes } from "react";
// Components
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Text from "../../../../../components/ui/Text/Text";
import EditAnswerOption from "../../ui/EditAnswerOption/EditAnswerOption";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import Button from "../../../../../components/ui/Button/Button";
import IconTextSection from "../../../../../components/layout/IconTextSection/IconTextSection";
import { faBan } from "@fortawesome/free-solid-svg-icons";
// Hooks
import useEditQuestion from "../../../../question/contexts/EditQuestionContext/useEditQuestion";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// CSS
import "./EditAnswerOptions.css";

type EditAnswerOptionsProps = HTMLAttributes<HTMLDetailsElement>;

const EditAnswerOptions: FC<EditAnswerOptionsProps> = ({ className }) => {
	// #region Hooks
	const { data, addAnswerOption } = useEditQuestion();
	// #endregion

	return (
		<Accordion defaultOpen className={`editAnswerOptions${addPropClassName(className)}`}>
			<Accordion.Header>Answer options</Accordion.Header>

			<Accordion.Body>
				<FlexContainer direction="column" mb="1rem">
					{data.answerOptions.length === 0 && (
						<IconTextSection icon={faBan} text={<Text mb="0">No answer options.</Text>} />
					)}

					{data.answerOptions.map((option) => (
						<EditAnswerOption key={option.id} option={option} />
					))}
				</FlexContainer>

				<Button onClick={addAnswerOption}>New option</Button>
			</Accordion.Body>
		</Accordion>
	);
};

export default EditAnswerOptions;
