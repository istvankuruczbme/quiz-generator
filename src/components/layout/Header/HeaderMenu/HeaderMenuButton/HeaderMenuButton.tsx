import { forwardRef } from "react";
import Button, { ButtonProps } from "../../../../ui/Button/Button";
import "./HeaderMenuButton.css";
import addPropClassName from "../../../../../utils/addPropClassName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHeaderSidebar from "../../../../../contexts/HeaderSidebarContext/useHeaderSidebar";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

type HeaderMenuButtonProps = ButtonProps;

const HeaderMenuButton = forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
	({ className, ...rest }, ref) => {
		// #region Hooks
		const { show, setShow } = useHeaderSidebar();
		// #endregion

		// #region Functions
		function toggleSidebar(): void {
			setShow((show) => !show);
		}
		// #endregion

		return (
			<Button
				variant="primary"
				className={`headerMenuButton${addPropClassName(className)}`}
				onClick={toggleSidebar}
				{...rest}
				ref={ref}
			>
				<FontAwesomeIcon icon={show ? faXmark : faBars} />
			</Button>
		);
	}
);

export default HeaderMenuButton;
