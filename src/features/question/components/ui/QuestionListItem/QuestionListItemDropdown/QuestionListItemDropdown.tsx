import { FC, HTMLAttributes } from "react";
// Components
import DropdownProvider from "../../../../../../contexts/DropdownContext/DropdownProvider";
import Dropdown from "../../../../../../components/ui/Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// Hooks
import useQuestion from "../../../../contexts/QuestionContext/useQuestion";
import useDeleteQuestion from "../../../../contexts/DeleteQuestionModalContext/useDeleteQuestionModal";
// CSS
import "./QuestionListItemDropdown.css";

type QuestionListItemDropdownProps = HTMLAttributes<HTMLDivElement>;

const QuestionListItemDropdown: FC<QuestionListItemDropdownProps> = () => {
	// #region Hooks
	const { question, setShowEditQuestionForm } = useQuestion();
	const { setQuestion, setShowModal } = useDeleteQuestion();
	// #endregion

	// #region Functions
	function handleDeleteQuestionClick() {
		setQuestion(question);
		setShowModal(true);
	}
	// #endregion

	return (
		<DropdownProvider>
			<Dropdown>
				<Dropdown.Button>
					<span className="questionListItemDropdown__button">
						<FontAwesomeIcon icon={faEllipsisV} />
					</span>
				</Dropdown.Button>

				<Dropdown.Options>
					<Dropdown.Option onClick={() => setShowEditQuestionForm(true)}>Edit</Dropdown.Option>
					{/* <Dropdown.Option>Preview</Dropdown.Option> */}
					<Dropdown.Option variant="danger" onClick={handleDeleteQuestionClick}>
						Delete
					</Dropdown.Option>
				</Dropdown.Options>
			</Dropdown>
		</DropdownProvider>
	);
};

export default QuestionListItemDropdown;
