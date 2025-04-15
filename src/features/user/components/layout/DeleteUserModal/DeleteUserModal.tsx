import { FC, useState } from "react";
import { ModalProps } from "../../../../modal/types/modalTypes";
// Components
import ModalProvider from "../../../../modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../feedback/contexts/FeedbackContext/useFeedback";
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
		} catch (err) {
			// console.log("Error deleting the user from DB.", err);
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Sign out user
			await signOut();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Your profile was deleted.",
			});

			// Navigate to home page
			navigate("/");
		} catch (err) {
			// console.log("Error signing out the user.", err);
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
