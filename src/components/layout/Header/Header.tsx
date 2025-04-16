import { FC, HTMLAttributes } from "react";
// Components
import HeaderSidebar from "./HeaderSidebar/HeaderSidebar";
import HeaderSidebarProvider from "../../../contexts/HeaderSidebarContext/HeaderSidebarProvider";
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
		<HeaderSidebarProvider>
			<HeaderSidebar />

			<Header.Layout className="header">
				<Header.Home />

				<nav className="header__nav">
					<Header.Menu>
						{loading && (
							<Header.Menu className="header__menu">
								<Skeleton type="rect" width="80px" height="30px" />
								<Skeleton type="circle" width="30px" height="30px" />
							</Header.Menu>
						)}
						{!loading && (
							<>
								<SignedIn>
									<Header.Menu className="header__menu">
										<Header.Menu.Item to="/browse" label="Browse" />
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

									<Header.Menu.Button />
								</SignedIn>

								<NotSignedIn>
									<Header.Menu.Item to="/sign-in" label="Sign In" />
								</NotSignedIn>
							</>
						)}
					</Header.Menu>
				</nav>
			</Header.Layout>
		</HeaderSidebarProvider>
	);
};

Header.Layout = HeaderLayout;
Header.Menu = HeaderMenu;
Header.Home = HeaderHome;

export default Header;
