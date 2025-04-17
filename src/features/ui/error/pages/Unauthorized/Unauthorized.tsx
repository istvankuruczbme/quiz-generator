import { FC, HTMLAttributes } from "react";
import ErrorLayout from "../../../error/components/layout/ErrorLayout/ErrorLayout";
import ErrorModal from "../../../error/components/layout/ErrorModal/ErrorModal";
import Modal from "../../../modal/components/layout/Modal/Modal";
import LinkButton from "../../../../../components/ui/Button/LinkButton/LinkButton";
import Text from "../../../../../components/ui/Text/Text";
import "./Unauthorized.css";

type UnauthorizedProps = HTMLAttributes<HTMLDivElement>;

const Unauthorized: FC<UnauthorizedProps> = () => {
	return (
		<ErrorLayout>
			<ErrorModal>
				<ErrorModal.Header>
					<ErrorModal.Home />
					<Modal.Title>You are not signed in.</Modal.Title>
				</ErrorModal.Header>

				<Modal.Body>
					<Text mb="0">Plese sign in by clicking the button below to access the page.</Text>
				</Modal.Body>

				<ErrorModal.Footer>
					<LinkButton to="/sign-in" centered>
						Sign In
					</LinkButton>
				</ErrorModal.Footer>
			</ErrorModal>
		</ErrorLayout>
	);
};

export default Unauthorized;
