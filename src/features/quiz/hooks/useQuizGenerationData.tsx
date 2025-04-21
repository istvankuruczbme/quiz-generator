import { useEffect, useState } from "react";
import useProducts from "../../product/hooks/useProducts";
import useUserSubscription from "../../user/hooks/useUserSubscription";
import useQuizPrivate from "../contexts/QuizPrivateContext/useQuizPrivate";

const useQuizGenerationData = () => {
	// #region States
	const [maxQuestionCount, setMaxQuestionCount] = useState(NaN);
	const [maxAnswerOptionCount, setMaxAnswerOptionCount] = useState(NaN);

	const [questionCount, setQuestionCount] = useState(0);
	const [answerOptionCount, setAnswerOptionCount] = useState(0);
	//#endregion

	//#region Hooks
	const { subscription } = useUserSubscription();
	const { products } = useProducts();
	const { quiz } = useQuizPrivate();
	//#endregion

	// Update max values
	useEffect(() => {
		if (subscription == null || products.length === 0) return;

		// Get product ID from subscription
		const productId = subscription.items.data[0]?.price.product;

		// Check product ID
		if (typeof productId !== "string") return;

		// Get product data
		const product = products.find((product) => product.id === productId);

		// Check if the product was found
		if (product == undefined) return;

		// Update states
		setMaxQuestionCount(product.maxQuestionCount);
		setMaxAnswerOptionCount(product.maxAnswerOptionCount);
	}, [subscription, products]);

	// Set default values for inputs
	useEffect(() => {
		if (quiz == null || isNaN(maxQuestionCount) || isNaN(maxAnswerOptionCount)) return;

		setQuestionCount(maxQuestionCount - quiz.questions.length);
		setAnswerOptionCount(4 > maxAnswerOptionCount ? maxAnswerOptionCount : 4);
	}, [quiz, maxQuestionCount, maxAnswerOptionCount]);

	return {
		questionCount,
		setQuestionCount,
		answerOptionCount,
		setAnswerOptionCount,
		maxQuestionCount,
		maxAnswerOptionCount,
	};
};

export default useQuizGenerationData;
