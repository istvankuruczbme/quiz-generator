import { FC, HTMLAttributes, useState } from "react";
import { Product as ProductType } from "../../../../product/types/productTypes";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Text from "../../../../../components/ui/Text/Text";
import ProductFeatures from "./ProductFeatures/ProductFeatures";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useUser from "../../../../../contexts/UserContext/useUser";
import useProducts from "../../../../product/contexts/ProductsContext/useProducts";
import useUpdateSubscription from "../../../hooks/useUpdateSubscription";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
import useError from "../../../../error/hooks/useError";
// Functions
import createCheckoutSession from "../../../../product/services/createCheckoutSession";
import formatCurrency from "../../../../../utils/formatting/formatCurrency";
// CSS
import "./Product.css";
import AppError from "../../../../error/classes/AppError";

type ProductProps = HTMLAttributes<HTMLDivElement> & {
	product: ProductType;
};
type ProductChildren = {
	Features: typeof ProductFeatures;
};
type ProductComponent = FC<ProductProps> & ProductChildren;

const Product: ProductComponent = ({ product }) => {
	// #region States
	const [loading, setLoading] = useState(false);
	//#endregion

	// #region Hooks
	const { user } = useUser();
	const { userProductId } = useProducts();
	const { mutateAsync, loading: loadingSubscriptionUpdate } = useUpdateSubscription();
	const { setFeedback } = useFeedback();
	const { setError } = useError();
	// #endregion

	// #region Variables
	const maxQuizCountPerPeriod = Number.isFinite(product.maxQuizCountPerPeriod)
		? product.maxQuizCountPerPeriod.toString()
		: "No limit";
	// #endregion

	// #region Functions
	async function handleSubscriptionClick() {
		// Check user
		if (!user) return;

		// Create subscription
		if (!user.hasSubscription) {
			setLoading(true);

			try {
				// Create checkout session
				const { url } = await createCheckoutSession({
					userId: user.id,
					priceId: product.price.id,
					successUrl: "/profile/categories",
				});

				// Navigate to checkout portal
				window.location.href = url;
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}
		// Update subscription
		else {
			try {
				// Check same subscription
				if (userProductId === product.id) {
					throw new AppError({ message: "Plan is already in user." });
				}

				// Update subscription
				await mutateAsync({ priceId: product.price.id });

				// Show feedback
				setFeedback({
					type: "success",
					message: "Subscription updated.",
				});
			} catch (err) {
				setError(err);
			}
		}
	}
	// #endregion

	return (
		<div className="product">
			{product.id === userProductId && (
				<div className="product__current">Current subscription</div>
			)}

			{product.photoUrl != null ? (
				<img src={product.photoUrl} alt={product.name} className="product__img" />
			) : (
				<div className="product__img">
					<FontAwesomeIcon icon={faImage} className="product__img__icon" />
				</div>
			)}
			<h3 className="product__name">{product.name}</h3>

			<Text mb="2rem">{product.description}</Text>

			<Product.Features className="product__features">
				<Product.Features.Item text={<>Max quizzes (per month): {maxQuizCountPerPeriod}</>} />
				<Product.Features.Item
					text={<>Max questions (per quiz): {product.maxQuestionCount}</>}
				/>
				<Product.Features.Item
					text={<>Max answer options (per question): {product.maxAnswerOptionCount}</>}
				/>
			</Product.Features>

			<div className="product__price">
				<span className="product__price__amount">
					{formatCurrency(product.price.amount / 100, product.price.currency)}
				</span>
				/month
			</div>

			<LoadingButton
				variant="accent"
				full
				disabled={userProductId === product.id || loading}
				loading={loading || loadingSubscriptionUpdate}
				onClick={handleSubscriptionClick}
			>
				Subscribe
			</LoadingButton>
		</div>
	);
};

Product.Features = ProductFeatures;

export default Product;
