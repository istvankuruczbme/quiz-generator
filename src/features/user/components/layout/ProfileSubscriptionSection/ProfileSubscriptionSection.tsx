import { FC, HTMLAttributes } from "react";
// Components
import ProfileSection from "../ProfileSection/ProfileSection";
import Section from "../../../../../components/layout/Section/Section";
import Text from "../../../../../components/ui/Text/Text";
import Button from "../../../../../components/ui/Button/Button";
import ProfileLinkButton from "../../ui/ProfileLinkButton/ProfileLinkButton";
import FlexContainer from "../../../../../components/layout/FlexContainer/FlexContainer";
import TextButtonBox from "../../../../../components/layout/Box/TextButtonBox/TextButtonBox";
// Function
import createCustomerPortal from "../../../services/createCustomerPortal";
import useUser from "../../../../../contexts/UserContext/useUser";
// CSS
import "./ProfileSubscriptionSection.css";
import useError from "../../../../error/hooks/useError";

type ProfileSubscriptionSectionProps = HTMLAttributes<HTMLDivElement>;

const ProfileSubscriptionSection: FC<ProfileSubscriptionSectionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { setError } = useError();
	//#endregion

	//#region Functions
	async function handleCustomerPortalClick() {
		// Check user
		if (!user) return;

		try {
			// Get session URL
			const { url } = await createCustomerPortal(user.id);

			// Go to URL
			window.location.href = url;
		} catch (err) {
			setError(err);
		}
	}
	//#endregion

	return (
		<ProfileSection>
			<Section.Title>Your subscription</Section.Title>

			<FlexContainer gap="3rem" wrap="576px">
				{user?.hasSubscription && (
					<TextButtonBox variant="primary" full>
						<Text variant="neutral-400">
							Click on My subscription button to manage everything related to your
							subscription. You will be redirected to Stripe's page.
						</Text>
						<Button
							variant="primary"
							className="profileSubscription__my"
							onClick={handleCustomerPortalClick}
						>
							My subscription
						</Button>
					</TextButtonBox>
				)}

				<TextButtonBox variant="primary" full>
					<Text variant="neutral-400">
						Click on the button to {user?.hasSubscription ? "change" : "select"} your
						subscription.
					</Text>
					<ProfileLinkButton to="/profile/subscription">
						{user?.hasSubscription ? "Change" : "Select"} subscription
					</ProfileLinkButton>
				</TextButtonBox>
			</FlexContainer>
		</ProfileSection>
	);
};

export default ProfileSubscriptionSection;
