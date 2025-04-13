import { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from "react";
// Components
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../../components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import ModalProvider from "../../../../../contexts/ModalContext/ModalProvider";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useError from "../../../../error/hooks/useError";
// Functions
import removeUserPhoto from "../../../services/removeUserPhoto";
import useFeedback from "../../../../feedback/contexts/FeedbackContext/useFeedback";
// CSS
import "./DeletePhotoModal.css";

type DeletePhotoModalProps = HTMLAttributes<HTMLDivElement> & {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	setPhotoUrl: Dispatch<SetStateAction<string>>;
};

const DeletePhotoModal: FC<DeletePhotoModalProps> = ({ show, setShow, setPhotoUrl }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { user, updateUserState } = useUser();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Functions
	async function handleDeletePhoto() {
		// Check user
		if (user == null) return;

		setLoading(true);

		try {
			// Remove user photo
			await removeUserPhoto(user.id);

			// Update user state
			await updateUserState();
			setPhotoUrl("");

			// Show feedback
			setFeedback({
				type: "success",
				message: "Photo removed.",
			});
		} catch (err) {
			console.log("Error removing the photo of user.", err);
			setError(err);
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
						<Modal.Title>Delete photo</Modal.Title>

						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text mb="0">Are you sure you want to delete your photo?</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel />
						<LoadingButton variant="danger" onClick={handleDeletePhoto} loading={loading}>
							Delete
						</LoadingButton>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default DeletePhotoModal;
