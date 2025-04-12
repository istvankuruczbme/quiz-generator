import { FC, HTMLAttributes } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import SubscriptionMissingAlert from "../../components/ui/SubscriptionMissingAlert/SubscriptionMissingAlert";
import Product from "../../components/ui/Product/Product";
import ProductContainer from "../../components/layout/ProductContainer/ProductContainer";
import Text from "../../../../components/ui/Text/Text";
// Hooks
import useUser from "../../../../contexts/UserContext/useUser";
import useProducts from "../../../product/contexts/useProducts";
import { useSearchParams } from "react-router-dom";
// CSS
import "./ChangeSubscription.css";

type ChangeSubscriptionProps = HTMLAttributes<HTMLDivElement>;

const ChangeSubscription: FC<ChangeSubscriptionProps> = () => {
	// #region Hooks
	const { user } = useUser();
	const { products } = useProducts();
	const [searchParams] = useSearchParams();
	//#endregion

	// #region Variables
	const success = searchParams.get("success") === "";
	const cancel = searchParams.get("cancel") === "";
	// #endregion

	return (
		<Page>
			<Page.Section>
				<Page.Title>{user?.hasSubscription ? "Change" : "Select"} Subscription</Page.Title>
			</Page.Section>

			{(!user?.hasSubscription || success || cancel) && (
				<Page.Section>
					{!user?.hasSubscription && <SubscriptionMissingAlert />}
					{cancel && <p>Payment cancelled.</p>}
					{success && <p>Payment was successful.</p>}
				</Page.Section>
			)}

			<Page.Section>
				<ProductContainer>
					{products.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</ProductContainer>
			</Page.Section>

			<Page.Section>
				<Text>After you click on Subscribe you will be redirected to the payment page.</Text>
			</Page.Section>
		</Page>
	);
};

export default ChangeSubscription;
