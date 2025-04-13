import { FC } from "react";
import { ButtonProps } from "../../../../../components/ui/Button/Button";
// Components
import BackButton from "../../../../../components/ui/Button/BackButton/BackButton";
// Functions
import addPropClassName from "../../../../../utils/addPropClassName";
// CSS
import "./ProfileBackButton.css";

type ProfileBackButtonProps = ButtonProps;

const ProfileBackButton: FC<ProfileBackButtonProps> = ({
	variant = "primary",
	className,
	...rest
}) => {
	return (
		<BackButton
			to="/profile"
			variant={variant}
			className={`profileBackButton${addPropClassName(className)}`}
			{...rest}
		>
			Profile
		</BackButton>
	);
};

export default ProfileBackButton;
