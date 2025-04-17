import { FC, HTMLAttributes } from "react";
import ModalHeader from "../../../../../ui/modal/components/layout/ModalHeader/ModalHeader";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./AuthModalHeader.css";

type AuthModalHeaderProps = HTMLAttributes<HTMLDivElement>;

const AuthModalHeader: FC<AuthModalHeaderProps> = ({ className, children }) => {
	return (
		<ModalHeader className={`authModalHeader${addPropClassName(className)}`}>
			{children}
		</ModalHeader>
	);
};

export default AuthModalHeader;
