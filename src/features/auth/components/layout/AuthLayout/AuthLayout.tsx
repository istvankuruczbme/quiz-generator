import { FC, HTMLAttributes } from "react";
import Container from "../../../../../components/layout/Container/Container";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./AuthLayout.css";

type AuthLayoutProps = HTMLAttributes<HTMLDivElement>;

const AuthLayout: FC<AuthLayoutProps> = ({ className, children }) => {
	return (
		<div className={`authLayout${addPropClassName(className)}`}>
			<Container className="authLayout__container">{children}</Container>
		</div>
	);
};

export default AuthLayout;
