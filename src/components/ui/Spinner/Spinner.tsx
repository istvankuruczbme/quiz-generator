import { FC, HTMLAttributes } from "react";
import addPropClassName from "../../../utils/addPropClassName";
import "./Spinner.css";

type SpinnerProps = HTMLAttributes<HTMLSpanElement>;

const Spinner: FC<SpinnerProps> = ({ className }) => {
	return <span className={`spinner${addPropClassName(className)}`}></span>;
};

export default Spinner;
