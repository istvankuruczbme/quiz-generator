import { FC, HTMLAttributes } from "react";
// Components
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../../quiz/contexts/QuizPrivateContext/useQuizPrivate";
import useDeleteQuestionModal from "../../../contexts/DeleteQuestionModalContext/useDeleteQuestionModal";
import useDeleteQuestion from "../../../hooks/useDeleteQuestion";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// CSS
import "./DeleteQuestionModal.css";

type DeleteQuestionModalProps = HTMLAttributes<HTMLDivElement>;

const DeleteQuestionModal: FC<DeleteQuestionModalProps> = () => {
	// #region Hooks
	const { quiz } = useQuizPrivate();
	const { question, showModal: show, setShowModal: setShow } = useDeleteQuestionModal();
	const { mutateAsync, loading } = useDeleteQuestion();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	//#region Functions
	async function handleDeleteQuestion() {
		// Check quiz and question
		if (!quiz || !question) return;

		try {
			// Delete question
			await mutateAsync({ quizId: quiz.id, questionId: question.id });

			// Close modal
			setShow(false);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Question deleted.",
			});
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<div onPointerDown={(e) => e.stopPropagation()}>
			<ModalProvider show={show} setShow={setShow}>
				<Overlay>
					<Modal>
						<Modal.Header>
							<Modal.Title>Delete question</Modal.Title>
							<Modal.Close />
						</Modal.Header>

						<Modal.Body>
							<Text mb="0">Are you sure you want to delete the question?</Text>
						</Modal.Body>

						<Modal.Footer>
							<Modal.Cancel />
							<LoadingButton
								variant="danger"
								loading={loading}
								onClick={handleDeleteQuestion}
							>
								Delete
							</LoadingButton>
						</Modal.Footer>
					</Modal>
				</Overlay>
			</ModalProvider>
		</div>
	);
};

export default DeleteQuestionModal;
