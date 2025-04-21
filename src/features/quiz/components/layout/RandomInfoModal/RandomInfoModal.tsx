import { FC } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import "./RandomInfoModal.css";

type RandomInfoModalProps = ModalProps;

const RandomInfoModal: FC<RandomInfoModalProps> = ({ show, setShow }) => {
	return (
		<ModalProvider show={show} setShow={setShow}>
			<Overlay>
				<Modal>
					<Modal.Header>
						<Modal.Title>Random strategy</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text>Random strategy picks random parts from the uploaded document.</Text>
						<Text mb="0">
							If you choose this strategy please make sure to cut out unneccesary parts of
							the document (e.g. table of contents) to avoid generating a question from it.
						</Text>
					</Modal.Body>

					<Modal.Footer>
						<Modal.Cancel>Close</Modal.Cancel>
					</Modal.Footer>
				</Modal>
			</Overlay>
		</ModalProvider>
	);
};

export default RandomInfoModal;
