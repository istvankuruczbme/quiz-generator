import { FC, HTMLAttributes } from "react";
import "./Profile.css";
import ProfileCategoriesSection from "../../components/layout/ProfileCategoriesSection/ProfileCategoriesSection";

type ProfileProps = HTMLAttributes<HTMLDivElement>;

const Profile: FC<ProfileProps> = () => {
	return (
		<div>
			<h1>Profile</h1>

			<ProfileCategoriesSection />
		</div>
	);
};

export default Profile;
