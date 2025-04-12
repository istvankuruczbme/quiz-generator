import { FC } from "react";
import Button, { ButtonProps } from "../Button";
// Components
import { Link } from "react-router-dom";
// Functions
import addPropClassName from "../../../../utils/addPropClassName";
// CSS
import "./LinkButton.css";

type LinkButtonProps = ButtonProps & {
	to: string;
};

const LinkButton: FC<LinkButtonProps> = ({ to, className, children, ...rest }) => {
	return (
		<Link to={to} className={`linkButton${addPropClassName(className)}`}>
			<Button tabIndex={-1} {...rest}>
				{children}
			</Button>
		</Link>
	);
};

export default LinkButton;
