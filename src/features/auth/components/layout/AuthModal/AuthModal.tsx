import { FC, HTMLAttributes } from "react";
import Modal from "../../../../ui/modal/components/layout/Modal/Modal";
import AuthModalHeader from "./AuthModalHeader/AuthModalHeader";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./AuthModal.css";

type AuthModalProps = HTMLAttributes<HTMLDivElement>;
type AuthModalChildren = {
	Header: typeof AuthModalHeader;
};
type AuthModalComponent = FC<AuthModalProps> & AuthModalChildren;

const AuthModal: AuthModalComponent = ({ className, children }) => {
	return (
		<Modal inert={false} className={`authModal${addPropClassName(className)}`}>
			{children}
		</Modal>
	);
};

AuthModal.Header = AuthModalHeader;

export default AuthModal;
