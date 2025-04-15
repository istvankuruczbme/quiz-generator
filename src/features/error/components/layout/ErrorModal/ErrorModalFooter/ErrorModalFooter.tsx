import { FC, HTMLAttributes } from "react";
import ModalFooter from "../../../../../modal/components/layout/ModalFooter/ModalFooter";
import addPropClassName from "../../../../../../utils/addPropClassName";
import "./ErrorModalFooter.css";

type ErrorModalFooterProps = HTMLAttributes<HTMLDivElement>;

const ErrorModalFooter: FC<ErrorModalFooterProps> = ({ className, children }) => {
	return (
		<ModalFooter className={`errorModalFooter${addPropClassName(className)}`}>
			{children}
		</ModalFooter>
	);
};

export default ErrorModalFooter;
