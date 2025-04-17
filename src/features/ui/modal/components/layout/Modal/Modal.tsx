import { FC, HTMLAttributes, useRef } from "react";
import ModalHeader from "../ModalHeader/ModalHeader";
import ModalTitle from "../../ui/ModalTitle/ModalTitle";
import ModalClose from "../../ui/ModalClose/ModalClose";
import ModalBody from "../ModalBody/ModalBody";
import ModalFooter from "../ModalFooter/ModalFooter";
import ModalCancel from "../../ui/ModalCancel/ModalCancel";
// Hooks
import useModal from "../../../contexts/ModalContext/useModal";
import useFocusModal from "../../../hooks/useFocusModal";
import useModalKeyboardNavigation from "../../../hooks/useModalKeyboardNavigation";
import useDisableBodyScroll from "../../../hooks/useDisableBodyScroll";
// Functions
import addPropClassName from "../../../../../../utils/addPropClassName";
// CSS
import "./Modal.css";

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

const Modal: ModalComponent = ({ inert, className, children }) => {
	// #region Refs
	const modalRef = useRef<HTMLDivElement>(null);
	const lastFocusedElementRef = useRef<HTMLElement | null>(null);
	// #endregion

	// #region Hooks
	const { show } = useModal();
	useFocusModal(modalRef, lastFocusedElementRef);
	useModalKeyboardNavigation(modalRef);
	useDisableBodyScroll();
	// #endregion

	return (
		<div
			inert={inert == undefined ? !show : inert}
			className={`modal${addPropClassName(className)}`}
			ref={modalRef}
		>
			{children}
		</div>
	);
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Close = ModalClose;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Cancel = ModalCancel;

export default Modal;
