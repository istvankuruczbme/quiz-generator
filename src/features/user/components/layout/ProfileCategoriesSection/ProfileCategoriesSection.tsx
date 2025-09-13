import { FC, HTMLAttributes } from "react";
// Components
import ProfileSection from "../ProfileSection/ProfileSection";
import Section from "../../../../../components/layout/Section/Section";
import CategoriesContainer from "../../../../category/components/layout/CategoriesContainer/CategoriesContainer";
import CategoryCheckbox from "../../../../category/components/form/CategoryCheckbox/CategoryCheckbox";
import Text from "../../../../../components/ui/Text/Text";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
import Suspense from "../../../../../components/layout/Suspense/Suspense";
import CategoriesSkeleton from "../../ui/CategoriesSkeleton/CategoriesSkeleton";
// Hooks
import useUserCategories from "../../../hooks/useUserCategories";
// CSS
import "./ProfileCategoriesSection.css";

type ProfileCategoriesSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileCategoriesSection: FC<ProfileCategoriesSectionProps> = () => {
	// #region Hooks
	const { categories, loading } = useUserCategories();
	// #endregion

	return (
		<ProfileSection>
			<Section.Title>Your categories</Section.Title>

			<Text variant="neutral-400">
				Here you can see your categories. Click on the button below to change them.
			</Text>

			<CategoriesContainer className="profileCategories__container">
				<Suspense loading={loading} fallback={<CategoriesSkeleton />}>
					{categories.length === 0 && <Text mb="-2rem">No categories.</Text>}
					{categories.map((category) => (
						<CategoryCheckbox
							key={category.id}
							icon={category.icon}
							name={category.name}
							id={category.id}
							checked
							disabled
						/>
					))}
				</Suspense>
			</CategoriesContainer>

			<ProfileLinkButton to="/profile/categories">
				{categories.length === 0 ? "Select" : "Change"} categories
			</ProfileLinkButton>
		</ProfileSection>
	);
};

export default ProfileCategoriesSection;
