import { FC, HTMLAttributes } from "react";
import Modal from "../../../../../components/layout/Modal/Modal";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./AuthModal.css";

type AuthModalProps = HTMLAttributes<HTMLDivElement>;

const AuthModal: FC<AuthModalProps> = ({ className, children }) => {
	return <Modal className={`authModal${addPropClassName(className)}`}>{children}</Modal>;
};

export default AuthModal;
