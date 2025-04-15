import { FC, HTMLAttributes } from "react";
import ModalHeader from "../../../../../modal/components/layout/ModalHeader/ModalHeader";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./ErrorModalHeader.css";

type ErrorModalHeaderProps = HTMLAttributes<HTMLDivElement>;

const ErrorModalHeader: FC<ErrorModalHeaderProps> = ({ className, children }) => {
	return (
		<ModalHeader className={`errorModalHeader${addPropClassName(className)}`}>
			{children}
		</ModalHeader>
	);
};

export default ErrorModalHeader;
