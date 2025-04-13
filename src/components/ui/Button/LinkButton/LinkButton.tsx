import { FC } from "react";
import Button, { ButtonProps } from "../Button";
// Components
import { Link } from "react-router-dom";
// Functions
import addPropClassName from "../../../../utils/addPropClassName";
// CSS
import "./LinkButton.css";

export type LinkButtonProps = ButtonProps & {
	to: string;
};

const LinkButton: FC<LinkButtonProps> = ({ to, className, children, ...rest }) => {
	return (
		<Link to={to} className="linkButton">
			<Button
				tabIndex={-1}
				className={`linkButton__button${addPropClassName(className)}`}
				{...rest}
			>
				{children}
			</Button>
		</Link>
	);
};

export default LinkButton;
