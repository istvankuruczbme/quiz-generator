import { FC } from "react";
import { ButtonProps } from "../../../../../../../components/ui/Button/Button";
import BackButton from "../../../../../../../components/ui/Button/BackButton/BackButton";
import addPropClassName from "../../../../../../../utils/addPropClassName";
import "./ErrorModalHome.css";

type ErrorModalHomeProps = ButtonProps;

const ErrorModalHome: FC<ErrorModalHomeProps> = ({ className, ...rest }) => {
	return (
		<BackButton
			to="/"
			variant="secondary"
			className={`errorModalHome${addPropClassName(className)}`}
			{...rest}
		>
			Home
		</BackButton>
	);
};

export default ErrorModalHome;
