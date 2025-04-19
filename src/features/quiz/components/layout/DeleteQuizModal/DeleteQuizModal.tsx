import { FC, useState } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import { useNavigate } from "react-router-dom";
import useError from "../../../../ui/error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import deleteQuiz from "../../../sevices/deleteQuiz";
// CSS
import "./DeleteQuizModal.css";

type DeleteQuizModalProps = ModalProps;

const DeleteQuizModal: FC<DeleteQuizModalProps> = ({ show, setShow }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz } = useQuizPrivate();
	const navigate = useNavigate();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	//#endregion

	//#region Functions
	async function handleQuizDelete() {
		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		try {
			// Delete quiz
			await deleteQuiz(quiz.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz deleted.",
			});

			// Close modal
			setShow(false);

			// Navigate ti My quizzes page
			navigate("/my-quizzes");
		} catch (err) {
			// console.log("Error deleting the quiz.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<ModalProvider show={show} setShow={setShow}>
			<Overlay>
				<Modal>
					<Modal.Header>
						<Modal.Title>Delete quiz</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text mb="0">Are you sure you want to delete the quiz?</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel />
						<LoadingButton variant="danger" loading={loading} onClick={handleQuizDelete}>
							Delete
						</LoadingButton>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default DeleteQuizModal;
