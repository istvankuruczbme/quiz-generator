import { FC } from "react";
import { ModalProps } from "../../../../ui/modal/types/modalTypes";
import ModalProvider from "../../../../ui/modal/contexts/ModalContext/ModalProvider";
import Overlay from "../../../../../components/layout/Overlay/Overlay";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import Text from "../../../../../components/ui/Text/Text";
import "./TfidfInfoModal.css";

type TfidfInfoModalProps = ModalProps;

const TfidfInfoModal: FC<TfidfInfoModalProps> = ({ show, setShow }) => {
	return (
		<ModalProvider show={show} setShow={setShow}>
			<Overlay>
				<Modal>
					<Modal.Header>
						<Modal.Title>TF-IDF strategy</Modal.Title>
						<Modal.Close />
					</Modal.Header>

					<Modal.Body>
						<Text>
							TF-IDF (Term Frequency - Inverse Document Frequency) is a statistical approach
							to get the keywords of the text.
						</Text>
						<Text>
							This algorithm scores every word based on how many times it appears in the
							document and how many documents contain it. The score (the result of the
							algorithm) shows how unique is the given word to all the documents.
						</Text>
						<Text mb="0">
							This algorithm splits the document text into terms (words). Since this
							word-splitter was designed for english texts it works best with english
							language.
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

export default TfidfInfoModal;
