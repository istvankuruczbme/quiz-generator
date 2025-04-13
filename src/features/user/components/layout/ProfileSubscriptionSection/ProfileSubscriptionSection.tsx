import { FC, HTMLAttributes } from "react";
// Components
import Section from "../../../../../components/layout/Section/Section";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
// Function
import createCustomerPortal from "../../../services/createCustomerPortal";
import useUser from "../../../../../contexts/UserContext/useUser";
// CSS
import "./ProfileSubscriptionSection.css";

type ProfileSubscriptionSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileSubscriptionSection: FC<ProfileSubscriptionSectionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	//#endregion

	//#region Functions
	async function handleCustomerPortalClick() {
		// Check user
		if (user == null) return;

		try {
			// Get session URL
			const { url } = await createCustomerPortal(user.id);

			// Go to URL
			window.location.href = url;
		} catch (err) {
			console.log("Error getting to customer portal.", err);
		}
	}
	//#endregion

	return (
		<Section>
			<Section.Title>Your subscription</Section.Title>

			<Text variant="neutral-400">
				Click on My subscription button to manage everything related to your subscription. You
				will be redirected to Stripe's page.
			</Text>
			<Button
				variant="accent"
				className="profileSubscription__my"
				onClick={handleCustomerPortalClick}
			>
				My subscription
			</Button>

			<Text variant="neutral-400">
				Click on Change subscription button to change your subscription.
			</Text>
			<ProfileLinkButton to="/profile/subscription">Change subscription</ProfileLinkButton>
		</Section>
	);
};

export default ProfileSubscriptionSection;
