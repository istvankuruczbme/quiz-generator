import { FC, HTMLAttributes } from "react";
import Section from "../../../../../components/layout/Section/Section";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import Box from "../../../../../components/layout/Box/Box";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
import Text from "../../../../../components/ui/Text/Text";
import "./ProfileEmailPasswordSection.css";

type ProfileEmailPasswordSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileEmailPasswordSection: FC<ProfileEmailPasswordSectionProps> = () => {
	return (
		<Section>
			<Section.Title>Email & password</Section.Title>

			<FlexContainer gap="3rem" wrap="576px">
				<Box variant="primary" full>
					<Text variant="neutral-400">Click on Change email button to change your email.</Text>
					<ProfileLinkButton to="change-email">Change email</ProfileLinkButton>
				</Box>

				<Box variant="primary" full>
					<Text variant="neutral-400">Click on Change email button to change your email.</Text>
					<ProfileLinkButton to="change-password">Change password</ProfileLinkButton>
				</Box>
			</FlexContainer>
		</Section>
	);
};

export default ProfileEmailPasswordSection;
