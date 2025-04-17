import { FC, HTMLAttributes } from "react";
import "./ModalBody.css";
import addPropClassName from "../../../../../../utils/addPropClassName";

type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

const ModalBody: FC<ModalBodyProps> = ({ className, children }) => {
	return <div className={`modalBody${addPropClassName(className)}`}>{children}</div>;
};

export default ModalBody;
