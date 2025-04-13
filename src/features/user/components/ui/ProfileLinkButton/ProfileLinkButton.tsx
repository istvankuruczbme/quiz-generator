import { FC } from "react";
import LinkButton, {
	LinkButtonProps,
} from "../../../../../components/ui/Button/LinkButton/LinkButton";
import addPropClassName from "../../../../../utils/addPropClassName";
import "./ProfileLinkButton.css";

type ProfileLinkButtonProps = LinkButtonProps;

const ProfileLinkButton: FC<ProfileLinkButtonProps> = ({ className, children, ...rest }) => {
	return (
		<LinkButton
			variant="primary"
			className={`profileLinkButton${addPropClassName(className)}`}
			{...rest}
		>
			{children}
		</LinkButton>
	);
};

export default ProfileLinkButton;
