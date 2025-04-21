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
import { useNavigate } from "react-router-dom";
// Functions
import createCheckoutSession from "../../../../product/services/createCheckoutSession";
import updateSubscription from "../../../services/updateSubscription";
import formatCurrency from "../../../../../utils/formatting/formatCurrency";
// CSS
import "./Product.css";

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
	const navigate = useNavigate();
	// #endregion

	// #region Variables
	const maxQuizCountPerPeriod = Number.isFinite(product.maxQuizCountPerPeriod)
		? product.maxQuizCountPerPeriod.toString()
		: "No limit";
	// #endregion

	// #region Functions
	async function handleSubscriptionClick() {
		// Check user
		if (user == null) return;

		setLoading(true);

		// Create subscription
		if (!user.hasSubscription) {
			try {
				// Create checkout session
				const { url } = await createCheckoutSession(
					user.id,
					product.price.id,
					"/profile/categories"
				);

				// Navigate to checkout portal
				window.location.href = url;
			} catch (err) {
				console.log("Error creating the checkout session.", err);
			} finally {
				setLoading(false);
			}
		}
		// Update subscription
		else {
			try {
				// Check same product ID
				if (userProductId === product.id) throw new Error("subscription/same-plan");
			} catch (err) {
				console.log(err);
				setLoading(false);
				return;
			}

			try {
				// Update subscription
				await updateSubscription(user.id, product.price.id);

				// Navigate to Profile page
				navigate("/profile");
			} catch (err) {
				console.log("Error updating the subscription.", err);
			} finally {
				setLoading(false);
			}
		}
	}
	// #endregion

	return (
		<div className={`product${product.id === userProductId ? " product--current" : ""}`}>
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
				loading={loading}
				onClick={handleSubscriptionClick}
			>
				Subscribe
			</LoadingButton>
		</div>
	);
};

Product.Features = ProductFeatures;

export default Product;
