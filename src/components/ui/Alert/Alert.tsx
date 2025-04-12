import { CSSProperties, FC, HTMLAttributes } from "react";
// Components
import AlertHeader from "./AlertHeader/AlertHeader";
import AlertTitle from "./AlertTitle/AlertTitle";
import AlertBody from "./AlertBody/AlertBody";
// Hooks
import useAlert from "../../../contexts/AlertContext/useAlert";
// Funtions
import addPropClassName from "../../../utils/addPropClassName";
// Variables
import { ALERT_MAX_WIDTH } from "../../../assets/uiConstants";
// CSS
import "./Alert.css";

type AlertProps = HTMLAttributes<HTMLDivElement>;
type AlertChildren = {
	Header: typeof AlertHeader;
	Title: typeof AlertTitle;
	Body: typeof AlertBody;
};
type AlertComponent = FC<AlertProps> & AlertChildren;

const Alert: AlertComponent = ({ className, children }) => {
	// #region Hooks
	const { show, variant } = useAlert();
	// #endregion

	// #region Variables
	const style: CSSProperties & { "--max-width": string } = { "--max-width": ALERT_MAX_WIDTH };
	// #endregion

	if (!show) return null;
	return (
		<div style={style} className={`alert alert--${variant}${addPropClassName(className)}`}>
			{children}
		</div>
	);
};

Alert.Header = AlertHeader;
Alert.Title = AlertTitle;
Alert.Body = AlertBody;

export default Alert;
