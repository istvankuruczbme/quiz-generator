import { FC, useState } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import { useNavigate } from "react-router-dom";
// Functions
import deleteUser from "../../../services/deleteUser";
import signOut from "../../../../auth/services/signOut";
// CSS
import "./DeleteUserModal.css";

type DeleteUserModalProps = ModalProps;

const DeleteUserModal: FC<DeleteUserModalProps> = ({ show, setShow }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { user } = useUser();
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	const navigate = useNavigate();
	// #endregion

	// #region Functions
	async function handleDeleteUserClick(): Promise<void> {
		// Check user
		if (user == null) return;

		setLoading(true);

		try {
			// Delete user
			await deleteUser(user.id);

			// Show feedback
			setFeedback({
				type: "success",
				message: "Your profile was deleted.",
			});

			// Navigate to home page
			navigate("/");

			// Sign out user
			await signOut();
		} catch (err) {
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
						<Modal.Title>Delete your profile</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text>Are you sure you want to delete your profile?</Text>
						<Text mb="0">Your data and subscription will be lost!</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel />
						<LoadingButton variant="danger" onClick={handleDeleteUserClick} loading={loading}>
							Delete
						</LoadingButton>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default DeleteUserModal;
