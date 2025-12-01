import { FC, HTMLAttributes } from "react";
import AlertProvider from "../../../../../contexts/AlertContext/AlertProvider";
import Alert from "../../../../../components/ui/Alert/Alert";
import AlertCloseButton from "../../../../../components/ui/Alert/AlertCloseButton/AlertCloseButton";
import Text from "../../../../../components/ui/Text/Text";
import LinkButton from "../../../../../components/ui/Button/LinkButton/LinkButton";
import "./SubscriptionMissingAlert.css";

type SubscriptionMissingAlertProps = HTMLAttributes<HTMLDivElement>;

const SubscriptionMissingAlert: FC<SubscriptionMissingAlertProps> = () => {
	return (
		<AlertProvider variant="accent">
			<Alert>
				<Alert.Header>
					<Alert.Title>Warning!</Alert.Title>
					<AlertCloseButton />
				</Alert.Header>

				<Alert.Body>
					<Text variant="secondary">
						You don't have a subscription. Create one to have access to the whole applicaton.
					</Text>
					<Text variant="secondary" mb="0">
						Don't worry, there is a free tier.
					</Text>

					<LinkButton
						to="/profile/subscription"
						variant="primary"
						centered
						className="subscriptionMissingAlert__button"
					>
						Subscriptions
					</LinkButton>
				</Alert.Body>
			</Alert>
		</AlertProvider>
	);
};

export default SubscriptionMissingAlert;
