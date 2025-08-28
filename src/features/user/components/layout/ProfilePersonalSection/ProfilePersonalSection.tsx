import { FC, HTMLAttributes } from "react";
// Components
import ProfileSection from "../ProfileSection/ProfileSection";
import Section from "../../../../../components/layout/Section/Section";
import EditUserForm from "../../form/EditUserForm/EditUserForm";
// CSS
import "./ProfilePersonalSection.css";

type ProfilePersonalSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfilePersonalSection: FC<ProfilePersonalSectionProps> = () => {
	return (
		<ProfileSection>
			<Section.Title>Personal data</Section.Title>

			<EditUserForm />
		</ProfileSection>
	);
};

export default ProfilePersonalSection;
