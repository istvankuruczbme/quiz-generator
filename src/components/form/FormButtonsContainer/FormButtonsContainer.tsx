import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./FormButtonsContainer.css";

type FormButtonsContainerProps = HTMLAttributes<HTMLDivElement>;

const FormButtonsContainer: FC<FormButtonsContainerProps> = ({ className, children }) => {
	return <div className={`formButtonsContainer${addPropClassName(className)}`}>{children}</div>;
};

export default FormButtonsContainer;
