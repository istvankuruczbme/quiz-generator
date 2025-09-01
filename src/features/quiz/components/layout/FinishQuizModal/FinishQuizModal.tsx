import { FC } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useFinishQuiz from "../../../hooks/useFinishQuiz";
import { useNavigate } from "react-router-dom";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// CSS
import "./FinishQuizModal.css";

type FinishQuizModalProps = ModalProps;

const FinishQuizModal: FC<FinishQuizModalProps> = ({ show, setShow }) => {
	// #region Hooks
	const { quiz } = useQuizPrivate();
	const { mutateAsync, loading } = useFinishQuiz();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	const navigate = useNavigate();
	// #endregion

	// #region Functions
	async function handleFinishQuiz() {
		// Check quiz
		if (!quiz) return;

		try {
			// Finish quiz
			await mutateAsync(quiz.id);

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
			setError(err);
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
