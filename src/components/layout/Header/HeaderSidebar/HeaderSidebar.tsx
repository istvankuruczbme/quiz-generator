import { FC, HTMLAttributes, MouseEvent, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import useUser from "../../../../contexts/UserContext/useUser";
import defaultUserPhotoUrl from "../../../../features/user/assets/defaultUserPhotoUrl";
import useHeaderSidebar from "../../../../contexts/HeaderSidebarContext/useHeaderSidebar";
import "./HeaderSidebar.css";

type HeaderSidebarProps = HTMLAttributes<HTMLDivElement>;

const HeaderSidebar: FC<HeaderSidebarProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { show, setShow } = useHeaderSidebar();

	// useLayoutEffect(() => {
	// 	if (!show) return;

	// 	// Add click event listener
	// 	document.addEventListener("click", handleClick);

	// 	// Remove event listener
	// 	return () => document.removeEventListener("click", handleClick);
	// }, [show]);
	// #endregion

	// #region Functions
	function handleClick(e: globalThis.MouseEvent): void {
		const target = e.target as Element;
		console.log(target);
		if (!target.matches(".headerSidebar")) setShow(false);
	}
	// #endregion

	return (
		<div className={`headerSidebar${show ? " headerSidebar--show" : ""}`}>
			<ul className="headerSidebar__menu">
				<li className="headerSidebar__menu__item">
					<Link to="/browse" className="headerSidebar__menu__item__link">
						Browse
					</Link>
				</li>
				<li className="headerSidebar__menu__item">
					<Link to="/my-quizzes" className="headerSidebar__menu__item__link">
						My quizzes
					</Link>
				</li>
				<li className="headerSidebar__menu__item">
					<Link to="/Profile" className="headerSidebar__menu__item__link">
						<img src={user?.photoUrl || defaultUserPhotoUrl} alt={user?.name} />
						Profile
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default HeaderSidebar;
