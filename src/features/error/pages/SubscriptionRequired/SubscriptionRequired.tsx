import { FC, HTMLAttributes } from "react";
import ErrorLayout from "../../components/layout/ErrorLayout/ErrorLayout";
import ErrorModal from "../../components/layout/ErrorModal/ErrorModal";
import Modal from "../../../modal/components/layout/Modal/Modal";
import Text from "../../../../components/ui/Text/Text";
import LinkButton from "../../../../components/ui/Button/LinkButton/LinkButton";
import "./SubscriptionRequired.css";

type SubscriptionRequiredProps = HTMLAttributes<HTMLDivElement>;

const SubscriptionRequired: FC<SubscriptionRequiredProps> = () => {
	return (
		<ErrorLayout>
			<ErrorModal>
				<ErrorModal.Header>
					<ErrorModal.Home />
					<Modal.Title>Subscription required</Modal.Title>
				</ErrorModal.Header>

				<Modal.Body>
					<Text>
						Plese subscribe to one of our subscriptions to get full acces to the app.
					</Text>
					<Text mb="0">
						Don't be afraid there is a free tier if you just want to try it out.
					</Text>
				</Modal.Body>

				<ErrorModal.Footer>
					<LinkButton to="/profile/subscription" centered>
						Subscriptions
					</LinkButton>
				</ErrorModal.Footer>
			</ErrorModal>
		</ErrorLayout>
	);
};

export default SubscriptionRequired;
