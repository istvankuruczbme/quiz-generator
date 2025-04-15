import { FC, HTMLAttributes } from "react";
// Components
import HeaderLayout from "./HeaderLayout/HeaderLayout";
import HeaderHome from "./HeaderHome/HeaderHome";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import SignedIn from "../../../features/auth/components/layout/SignedIn/SignedIn";
import NotSignedIn from "../../../features/auth/components/layout/NotSignedIn/NotSignedIn";
import Skeleton from "../../ui/Skeleton/Skeleton";
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
	const { user, loading } = useUser();
	// #endregion

	return (
		<Header.Layout className="header">
			<Header.Home />

			<nav className="header__nav">
				<Header.Menu>
					{loading && (
						<>
							<Skeleton type="rect" width="80px" height="30px" />
							<Skeleton type="rect" width="80px" height="30px" />
						</>
					)}
					{!loading && (
						<>
							<SignedIn>
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
							</SignedIn>

							<NotSignedIn>
								<Header.Menu.Item to="/sign-in" label="Sign In" />
							</NotSignedIn>
						</>
					)}
				</Header.Menu>
			</nav>
		</Header.Layout>
	);
};

Header.Layout = HeaderLayout;
Header.Menu = HeaderMenu;
Header.Home = HeaderHome;

export default Header;
