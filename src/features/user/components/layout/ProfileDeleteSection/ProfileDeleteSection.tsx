import { FC, HTMLAttributes, useState } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import Button from "../../../../../components/ui/Button/Button";
import Text from "../../../../../components/ui/Text/Text";
// CSS
import "./ProfileDeleteSection.css";

type ProfileDeleteSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileDeleteSection: FC<ProfileDeleteSectionProps> = () => {
	//#region States
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
	//#endregion

	return (
		<Section>
			<DeleteUserModal show={showDeleteUserModal} setShow={setShowDeleteUserModal} />

			<Section.Title>Delete profile</Section.Title>

			<Text variant="neutral-400">
				Click on the button below to delete your account. By deleting your account your
				subscription will be lost.
			</Text>

			<Button variant="danger" onClick={() => setShowDeleteUserModal(true)}>
				Delete profile
			</Button>
		</Section>
	);
};

export default ProfileDeleteSection;
