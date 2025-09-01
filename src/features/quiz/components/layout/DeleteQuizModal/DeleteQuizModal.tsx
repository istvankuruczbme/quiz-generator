import { FC } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useDeleteQuiz from "../../../hooks/useDeleteQuiz";
import { useNavigate } from "react-router-dom";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// CSS
import "./DeleteQuizModal.css";

type DeleteQuizModalProps = ModalProps;

const DeleteQuizModal: FC<DeleteQuizModalProps> = ({ show, setShow }) => {
	// #region Hooks
	const { quiz } = useQuizPrivate();
	const { mutateAsync, loading } = useDeleteQuiz();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	const navigate = useNavigate();
	//#endregion

	//#region Functions
	async function handleQuizDelete() {
		// Check quiz
		if (quiz == null) return;

		try {
			// Delete quiz
			await mutateAsync(quiz.id);

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
			setError(err);
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
