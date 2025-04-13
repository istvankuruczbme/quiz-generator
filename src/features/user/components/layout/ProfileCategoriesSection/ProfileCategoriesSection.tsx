import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import CategoriesContainer from "../../../../category/components/layout/CategoriesContainer/CategoriesContainer";
import CategoryCheckbox from "../../../../category/components/form/CategoryCheckbox/CategoryCheckbox";
import CategorySkeleton from "../../../../category/components/ui/CategorySkeleton/CategorySkeleton";
import Text from "../../../../../components/ui/Text/Text";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
// Hooks
import useUserCategories from "../../../hooks/useUserCategories";
// CSS
import "./ProfileCategoriesSection.css";

type ProfileCategoriesSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileCategoriesSection: FC<ProfileCategoriesSectionProps> = () => {
	// #region Hooks
	const { userCategories, loading } = useUserCategories();
	// #endregion

	return (
		<Section>
			<Section.Title>Your categories</Section.Title>

			<Text variant="neutral-400">
				Here you can see your categories. Click on the button below to change them.
			</Text>

			<CategoriesContainer className="profileCategories__container">
				{loading && (
					<>
						<CategorySkeleton />
						<CategorySkeleton />
						<CategorySkeleton />
					</>
				)}
				{!loading &&
					userCategories.map((category) => (
						<CategoryCheckbox
							key={category.id}
							icon={category.icon}
							name={category.name}
							id={category.id}
							checked
							disabled
						/>
					))}
			</CategoriesContainer>

			<ProfileLinkButton to="categories">Change categories</ProfileLinkButton>
		</Section>
	);
};

export default ProfileCategoriesSection;
