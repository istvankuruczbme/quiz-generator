import { FC, HTMLAttributes } from "react";
// Components
import ProfileEmailPasswordSection from "../../components/layout/ProfileEmailPasswordSection/ProfileEmailPasswordSection";
import ProfileCategoriesSection from "../../components/layout/ProfileCategoriesSection/ProfileCategoriesSection";
import ProfilePersonalSection from "../../components/layout/ProfilePersonalSection/ProfilePersonalSection";
import ProfileDeleteSection from "../../components/layout/ProfileDeleteSection/ProfileDeleteSection";
import ProfileSubscriptionSection from "../../components/layout/ProfileSubscriptionSection/ProfileSubscriptionSection";
import ProfileSection from "../../components/layout/ProfileSection/ProfileSection";
import Page from "../../../../components/layout/Page/Page";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
// CSS
import "./Profile.css";

type ProfileProps = HTMLAttributes<HTMLDivElement>;

const Profile: FC<ProfileProps> = () => {
	return (
		<Page>
			<ProfileSection>
				<BackButton to="/" variant="primary">
					Home
				</BackButton>
				<Page.Title>Profile</Page.Title>
			</ProfileSection>

			<ProfileEmailPasswordSection />

			<ProfilePersonalSection />

			<ProfileSubscriptionSection />

			<ProfileCategoriesSection />

			<ProfileDeleteSection />
		</Page>
	);
};

export default Profile;
