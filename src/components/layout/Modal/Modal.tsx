import { FC, HTMLAttributes } from "react";
import ModalHeader from "./ModalHeader/ModalHeader";
import ModalTitle from "./ModalTitle/ModalTitle";
import addPropClassName from "../../../utils/addPropClassName";
import ModalFooter from "./ModalFooter/ModalFooter";
import ModalBody from "./ModalBody/ModalBody";
import "./Modal.css";
import ModalClose from "./ModalClose/ModalClose";
import ModalCancel from "./ModalCancel/ModalCancel";

type ModalProps = HTMLAttributes<HTMLDivElement>;
type ModalChildren = {
	Header: typeof ModalHeader;
	Title: typeof ModalTitle;
	Close: typeof ModalClose;
	Body: typeof ModalBody;
	Footer: typeof ModalFooter;
	Cancel: typeof ModalCancel;
};
type ModalComponent = FC<ModalProps> & ModalChildren;

const Modal: ModalComponent = ({ className, children }) => {
	return <div className={`modal${addPropClassName(className)}`}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Close = ModalClose;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Cancel = ModalCancel;

export default Modal;
