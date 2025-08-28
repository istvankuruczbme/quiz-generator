import { FC, HTMLAttributes } from "react";
// Comopnents
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import ProfileBackButton from "../../../user/components/ui/ProfileBackButton/ProfileBackButton";
import Text from "../../../../components/ui/Text/Text";
// CSS
import "./ChangeCategories.css";
import ChangeCategoriesForm from "../../components/form/ChangeCategoriesForm/ChangeCategoriesForm";

type ChangeCategoriesProps = HTMLAttributes<HTMLDivElement>;

const ChangeCategories: FC<ChangeCategoriesProps> = () => {
	return (
		<Page>
			<Section>
				<ProfileBackButton />

				<Page.Title>Select Categories</Page.Title>

				<Text variant="neutral-400" mb="0">
					Select the categories you are interested in. Based on your selection the perfect
					quizzes will be recommended for you.
				</Text>
			</Section>

			<Section>
				<Section.Title>Categories</Section.Title>
				<ChangeCategoriesForm />
			</Section>
		</Page>
	);
};

export default ChangeCategories;
