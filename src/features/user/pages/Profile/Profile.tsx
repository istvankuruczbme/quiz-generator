import { FC, HTMLAttributes } from "react";
import "./Profile.css";
import ProfileCategoriesSection from "../../components/layout/ProfileCategoriesSection/ProfileCategoriesSection";
import ProfilePersonalSection from "../../components/layout/ProfilePersonalSection/ProfilePersonalSection";

type ProfileProps = HTMLAttributes<HTMLDivElement>;

const Profile: FC<ProfileProps> = () => {
	return (
		<div>
			<h1>Profile</h1>

			<ProfilePersonalSection />

			<ProfileCategoriesSection />
		</div>
	);
};

export default Profile;
