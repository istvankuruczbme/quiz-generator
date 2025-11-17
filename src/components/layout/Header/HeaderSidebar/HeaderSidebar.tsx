import { FC, HTMLAttributes } from "react";
// Components
import HeaderSidebarMenu from "./HeaderSidebarMenu/HeaderSidebarMenu";
import Header from "../Header";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useHeaderSidebar from "../../../../contexts/HeaderSidebarContext/useHeaderSidebar";
import useCloseHeaderSidebar from "../../../../hooks/headerSidebar/useCloseHeaderSidebar";
// Variables
import defaultUserPhotoUrl from "../../../../features/user/assets/defaultUserPhotoUrl";
// CSS
import "./HeaderSidebar.css";

type HeaderSidebarProps = HTMLAttributes<HTMLDivElement>;
type HeaderSidebarChildren = {
	Menu: typeof HeaderSidebarMenu;
};
type HeaderSidebarComponent = FC<HeaderSidebarProps> & HeaderSidebarChildren;

const HeaderSidebar: HeaderSidebarComponent = () => {
	// #region Hooks
	const { user } = useUser();
	const { show } = useHeaderSidebar();
	useCloseHeaderSidebar();
	// #endregion

	return (
		<div className={`headerSidebar${show ? " headerSidebar--show" : ""}`}>
			<HeaderSidebar.Menu>
				<Header.Menu.Item to="/browse" label="Browse" />
				<Header.Menu.Item to="/my-quizzes" label="My quizzes" />
				<Header.Menu.Item to="/my-completions" label="My completions" />
				<Header.Menu.Item
					to="/profile"
					label={
						<div className="headerSidebar__user">
							<img
								src={user?.photoUrl || defaultUserPhotoUrl}
								alt={user?.name}
								className="headerSidebar__user__photo"
							/>
							<span className="headerSidebar__user__profile">Profile</span>{" "}
						</div>
					}
				/>
			</HeaderSidebar.Menu>
		</div>
	);
};

HeaderSidebar.Menu = HeaderSidebarMenu;

export default HeaderSidebar;
