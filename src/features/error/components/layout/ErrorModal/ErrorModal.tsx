import { FC, HTMLAttributes } from "react";
import Modal from "../../../../modal/components/layout/Modal/Modal";
import ErrorModalHeader from "./ErrorModalHeader/ErrorModalHeader";
import ErrorModalHome from "./ErrorModalHome/ErrorModalHome";
import ErrorModalFooter from "./ErrorModalFooter/ErrorModalFooter";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./ErrorModal.css";

type ErrorModalProps = HTMLAttributes<HTMLDivElement>;
type ErrorModalChildren = {
	Header: typeof ErrorModalHeader;
	Home: typeof ErrorModalHome;
	Footer: typeof ErrorModalFooter;
};
type ErrorModalComponent = FC<ErrorModalProps> & ErrorModalChildren;

const ErrorModal: ErrorModalComponent = ({ className, children }) => {
	return (
		<Modal inert={false} className={`errorModal${addPropClassName(className)}`}>
			{children}
		</Modal>
	);
};

ErrorModal.Header = ErrorModalHeader;
ErrorModal.Home = ErrorModalHome;
ErrorModal.Footer = ErrorModalFooter;

export default ErrorModal;
