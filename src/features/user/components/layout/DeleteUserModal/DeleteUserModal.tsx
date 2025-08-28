import { FC } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
// Components
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useDeleteUser from "../../../hooks/useDeleteUser";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import signOut from "../../../../auth/services/signOut";
// CSS
import "./DeleteUserModal.css";

type DeleteUserModalProps = ModalProps;

const DeleteUserModal: FC<DeleteUserModalProps> = ({ show, setShow }) => {
	// #region Hooks
	const { mutateAsync, loading } = useDeleteUser();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	// #endregion

	// #region Functions
	async function handleDeleteUserClick(): Promise<void> {
		try {
			// Delete user
			await mutateAsync();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Your profile was deleted.",
			});

			// Sign out user
			await signOut();
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
