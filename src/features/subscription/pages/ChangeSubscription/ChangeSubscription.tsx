import { FC, HTMLAttributes } from "react";
import { Link, useSearchParams } from "react-router-dom";
// Components
import Page from "../../../../components/layout/Page/Page";
import Section from "../../../../components/layout/Section/Section";
import SubscriptionMissingAlert from "../../components/ui/SubscriptionMissingAlert/SubscriptionMissingAlert";
import Text from "../../../../components/ui/Text/Text";
import ProductsProvider from "../../../product/contexts/ProductsContext/ProductsProvider";
import SubscriptionProductsSection from "../../components/layout/SubscriptionProductsSection/SubscriptionProductsSection";
import ProfileBackButton from "../../../user/components/ui/ProfileBackButton/ProfileBackButton";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
// CSS
import "./ChangeSubscription.css";

type ChangeSubscriptionProps = HTMLAttributes<HTMLDivElement>;

const ChangeSubscription: FC<ChangeSubscriptionProps> = () => {
	// #region Hooks
	const { user, loading } = useUser();
	const [searchParams] = useSearchParams();
	//#endregion

	console.log({ user, loading });

	// #region Variables
	const success = searchParams.get("success") === "";
	const cancel = searchParams.get("cancel") === "";
	// #endregion

	return (
		<Page>
			<Section>
				<ProfileBackButton />
				<Page.Title>{user?.hasSubscription ? "Change" : "Select"} Subscription</Page.Title>

				<Text variant="neutral-400" mb="0">
					Select the subscription you like. Subscription can be changed in the future on this
					page.
				</Text>
			</Section>

			{(!user?.hasSubscription || success || cancel) && (
				<Section>
					{!user?.hasSubscription && <SubscriptionMissingAlert />}
					{cancel && <p>Payment cancelled.</p>}
					{success && <p>Payment was successful.</p>}
				</Section>
			)}

			<ProductsProvider>
				<SubscriptionProductsSection />
			</ProductsProvider>

			<Section>
				<Section.Title>Payment information</Section.Title>

				<Text>
					Payment actions are handled by <Link to="https://stripe.com/">Stripe</Link>.
				</Text>
				<Text>
					After you click on Subscribe you will be redirected to the payment page where you can
					add your card details.
				</Text>
				<Text mb="0">
					Don't be afraid Stripe is a secure payment provider used by many big companies like
					Amazon and Google.
				</Text>
			</Section>
		</Page>
	);
};

export default ChangeSubscription;
