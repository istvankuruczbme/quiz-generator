import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./ModalBody.css";

type ModalBodyProps = HTMLAttributes<HTMLDivElement>;

const ModalBody: FC<ModalBodyProps> = ({ className, children }) => {
	return <div className={`modalBody${addPropClassName(className)}`}>{children}</div>;
};

export default ModalBody;
