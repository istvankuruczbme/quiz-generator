import { FC, HTMLAttributes } from "react";
import "./ProfileCategoriesSection.css";

type ProfileCategoriesSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileCategoriesSection: FC<ProfileCategoriesSectionProps> = () => {
	return (
		<div>
			<h3>Categories</h3>
		</div>
	);
};

export default ProfileCategoriesSection;
