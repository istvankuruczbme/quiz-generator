import { FC, HTMLAttributes } from "react";
import "./FormText.css";
import addPropClassName from "../../../utils/addPropClassName";

type FormTextProps = HTMLAttributes<HTMLParagraphElement>;

const FormText: FC<FormTextProps> = ({ className, children }) => {
	return <p className={`formText${addPropClassName(className)}`}>{children}</p>;
};

export default FormText;
