import { FC, HTMLAttributes } from "react";
// Components
import Header from "../../../../../components/layout/Header/Header";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// CSS
import "./AuthHeader.css";

type AuthHeaderProps = HTMLAttributes<HTMLDivElement>;

const AuthHeader: FC<AuthHeaderProps> = ({ className }) => {
	return (
		<Header.Layout className={`authHeder${addPropClassName(className)}`}>
			<Header.Home />

			<nav className="authHeader__nav">
				<Header.Menu>
					<Header.Menu.Item to="/sign-in" label="Sign In" />
					<Header.Menu.Item to="/sign-up" label="Sign Up" />
				</Header.Menu>
			</nav>
		</Header.Layout>
	);
};

export default AuthHeader;
