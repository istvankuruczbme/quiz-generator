import { FC, HTMLAttributes } from "react";
// Components
import ProfileCategoriesSection from "../../components/layout/ProfileCategoriesSection/ProfileCategoriesSection";
import ProfilePersonalSection from "../../components/layout/ProfilePersonalSection/ProfilePersonalSection";
import ProfileDeleteSection from "../../components/layout/ProfileDeleteSection/ProfileDeleteSection";
import ProfileSubscriptionSection from "../../components/layout/ProfileSubscriptionSection/ProfileSubscriptionSection";
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
// CSS
import "./Profile.css";
import ProfileEmailPasswordSection from "../../components/layout/ProfileEmailPasswordSection/ProfileEmailPasswordSection";

type ProfileProps = HTMLAttributes<HTMLDivElement>;

const Profile: FC<ProfileProps> = () => {
	return (
		<Page>
			<Section>
				<BackButton to="/" variant="primary">
					Home
				</BackButton>
				<Page.Title>Profile</Page.Title>
			</Section>

			<ProfileEmailPasswordSection />

			<ProfilePersonalSection />

			<ProfileSubscriptionSection />

			<ProfileCategoriesSection />

			<ProfileDeleteSection />
		</Page>
	);
};

export default Profile;
