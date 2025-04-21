import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
import Text from "../../../../../components/ui/Text/Text";
import ProfileSection from "../ProfileSection/ProfileSection";
import TextButtonBox from "../../../../../components/layout/Box/TextButtonBox/TextButtonBox";
// CSS
import "./ProfileEmailPasswordSection.css";

type ProfileEmailPasswordSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileEmailPasswordSection: FC<ProfileEmailPasswordSectionProps> = () => {
	return (
		<ProfileSection>
			<Section.Title>Email & password</Section.Title>

			<FlexContainer gap="3rem" wrap="576px">
				<TextButtonBox variant="primary" full>
					<Text variant="neutral-400">Click on Change email button to change your email.</Text>
					<ProfileLinkButton to="change-email">Change email</ProfileLinkButton>
				</TextButtonBox>

				<TextButtonBox variant="primary" full>
					<Text variant="neutral-400">
						Click on Change password button to change your password.
					</Text>
					<ProfileLinkButton to="change-password">Change password</ProfileLinkButton>
				</TextButtonBox>
			</FlexContainer>
		</ProfileSection>
	);
};

export default ProfileEmailPasswordSection;
