import { FC, HTMLAttributes } from "react";
import "./QuizNotFound.css";
import ErrorLayout from "../../components/layout/ErrorLayout/ErrorLayout";
import ErrorModal from "../../components/layout/ErrorModal/ErrorModal";
import Modal from "../../../modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LinkButton from "../../../../../components/ui/Button/LinkButton/LinkButton";

type QuizNotFoundProps = HTMLAttributes<HTMLDivElement>;

const QuizNotFound: FC<QuizNotFoundProps> = () => {
	return (
		<ErrorLayout>
			<ErrorModal>
				<ErrorModal.Header>
					<ErrorModal.Home />
					<Modal.Title>Quiz not found</Modal.Title>
				</ErrorModal.Header>

				<Modal.Body>
					<Text mb="0">The requested quiz is not found.</Text>
				</Modal.Body>

				<ErrorModal.Footer>
					<LinkButton to="/my-quizzes" centered>
						My quizzes
					</LinkButton>
				</ErrorModal.Footer>
			</ErrorModal>
		</ErrorLayout>
	);
};

export default QuizNotFound;
