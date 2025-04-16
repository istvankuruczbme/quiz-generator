import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import addPropClassName from "../../../../../utils/addPropClassName";
// Variables
import { PROFILE_PAGE_MAX_WIDTH } from "../../../../../assets/uiConstants";
// CSS
import "./ProfileSection.css";

type ProfileSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileSection: FC<ProfileSectionProps> = ({ className, children }) => {
	return (
		<Section
			maxWidth={PROFILE_PAGE_MAX_WIDTH}
			className={`profileSection${addPropClassName(className)}`}
		>
			{children}
		</Section>
	);
};

export default ProfileSection;
