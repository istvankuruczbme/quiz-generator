import { FC, HTMLAttributes } from "react";
// Components
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import HeaderHome from "./HeaderHome/HeaderHome";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
// Hooks
import useUser from "../../../contexts/UserContext/useUser";
// Variables
import defaultUserPhotoUrl from "../../../features/user/assets/defaultUserPhotoUrl";
// CSS
import "./Header.css";

type HeaderProps = HTMLAttributes<HTMLDivElement>;
type HeaderChildren = {
	Layout: typeof HeaderLayout;
	Home: typeof HeaderHome;
	Menu: typeof HeaderMenu;
};
type HeaderComponent = FC<HeaderProps> & HeaderChildren;

const Header: HeaderComponent = () => {
	// #region Hooks
	const { user } = useUser();
	// #endregion

	return (
		<Header.Layout className="header">
			<Header.Home />

			<nav className="header__nav">
				<Header.Menu>
					<Header.Menu.Item to="/my-quizzes" label="My quizzes" />
					<Header.Menu.Item
						to="/profile"
						label={
							<img
								src={user?.photoUrl || defaultUserPhotoUrl}
								alt={user?.name}
								className="header__user__photo"
							/>
						}
					/>
				</Header.Menu>
			</nav>
		</Header.Layout>
	);
};

Header.Layout = HeaderLayout;
Header.Menu = HeaderMenu;
Header.Home = HeaderHome;

export default Header;
