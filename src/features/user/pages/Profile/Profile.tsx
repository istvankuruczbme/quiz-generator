import { FC, HTMLAttributes } from "react";
// Components
import ProfileCategoriesSection from "../../components/layout/ProfileCategoriesSection/ProfileCategoriesSection";
import ProfilePersonalSection from "../../components/layout/ProfilePersonalSection/ProfilePersonalSection";
import ProfileDeleteSection from "../../components/layout/ProfileDeleteSection/ProfileDeleteSection";
import ProfileSubscriptionSection from "../../components/layout/ProfileSubscriptionSection/ProfileSubscriptionSection";
// CSS
import "./Profile.css";

type ProfileProps = HTMLAttributes<HTMLDivElement>;

const Profile: FC<ProfileProps> = () => {
	return (
		<div>
			<h1>Profile</h1>

			<ProfilePersonalSection />

			<ProfileSubscriptionSection />

			<ProfileCategoriesSection />

			<ProfileDeleteSection />
		</div>
	);
};

export default Profile;
