import { Dispatch, FC, SetStateAction, useState } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import removeQuizPhoto from "../../../sevices/removeQuizPhoto";
// CSS
import "./DeleteQuizPhotoModal.css";

type DeleteQuizPhotoModalProps = ModalProps & {
	setPhotoUrl: Dispatch<SetStateAction<string>>;
};

const DeleteQuizPhotoModal: FC<DeleteQuizPhotoModalProps> = ({ show, setShow, setPhotoUrl }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleDeleteQuizPhoto() {
		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		try {
			// Remove quiz photo
			await removeQuizPhoto(quiz.id);

			// Update quiz state
			await updateQuizState();
			setPhotoUrl("");

			// Show feedback
			setFeedback({
				type: "success",
				message: "Photo removed.",
			});

			// Close modal
			setShow(false);
		} catch (err) {
			// console.log("Error removing the photo of quiz.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	// #endregion

	return (
		<ModalProvider show={show} setShow={setShow}>
			<Overlay>
				<Modal>
					<Modal.Header>
						<Modal.Title>Delete photo</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text mb="0">Are you sure you want to delete the photo of the quiz?</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel />
						<LoadingButton variant="danger" loading={loading} onClick={handleDeleteQuizPhoto}>
							Delete
						</LoadingButton>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default DeleteQuizPhotoModal;
