import { FC, useState } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import { useNavigate } from "react-router-dom";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import finishQuiz from "../../../sevices/finishQuiz";
// CSS
import "./FinishQuizModal.css";

type FinishQuizModalProps = ModalProps;

const FinishQuizModal: FC<FinishQuizModalProps> = ({ show, setShow }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Hooks
	const { quiz, updateQuizState } = useQuizPrivate();
	const navigate = useNavigate();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleFinishQuiz() {
		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		try {
			// Finish quiz
			await finishQuiz(quiz.id);

			// Update quiz state
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz finished.",
				details: "Now you can complete it.",
			});

			// Close modal
			setShow(false);

			// Navigate to My quizzes page
			navigate("/my-quizzes");
		} catch (err) {
			// console.log("Error finishing the quiz.", err);
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
						<Modal.Title>Finish quiz</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text>Are you sure you finish the quiz?</Text>
						<Text mb="0">
							After you click on Finish you won't be able to do any modifications.
						</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel />
						<LoadingButton variant="accent" loading={loading} onClick={handleFinishQuiz}>
							Finish
						</LoadingButton>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default FinishQuizModal;
