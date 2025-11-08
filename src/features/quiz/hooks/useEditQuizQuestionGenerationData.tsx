import { useEffect, useState } from "react";
import useProducts from "../../product/hooks/useProducts";
import useUserSubscription from "../../user/hooks/useUserSubscription";
import useQuizPrivate from "../contexts/QuizPrivateContext/useQuizPrivate";
import useFormData from "../../../hooks/form/useFormData";
import { EDIT_QUIZ_QUESTION_GENERATION_FORM_DATA } from "../constants/formData";

const useEditQuizQuestionGenerationData = () => {
	// #region States
	const [data, updateData] = useFormData(EDIT_QUIZ_QUESTION_GENERATION_FORM_DATA);
	const [maxQuestionCount, setMaxQuestionCount] = useState(NaN);
	const [maxAnswerOptionCount, setMaxAnswerOptionCount] = useState(NaN);
	//#endregion

	//#region Hooks
	const { subscription, loading: loadingSubscription } = useUserSubscription();
	const { products, loading: loadingProducts } = useProducts();
	const { quiz, loading: loadingQuiz } = useQuizPrivate();
	//#endregion

	// Update max values
	useEffect(() => {
		// No subscription or products or quiz
		if (!subscription || products.length === 0 || !quiz) return;

		// Get product ID from subscription
		const productId = subscription.items.data[0]?.price.product;

		// Check product ID
		if (typeof productId !== "string") return;

		// Get product data
		const product = products.find((product) => product.id === productId);

		// No product found
		if (!product) return;

		// Update states
		setMaxQuestionCount(product.maxQuestionCount - quiz.questions.length);
		setMaxAnswerOptionCount(product.maxAnswerOptionCount);
	}, [subscription, products, quiz]);

	// Set default values for inputs
	useEffect(() => {
		if (isNaN(maxQuestionCount) || isNaN(maxAnswerOptionCount)) return;

		// Update form data
		updateData({
			questionCount: maxQuestionCount.toString(),
			answerOptionCount: (4 > maxAnswerOptionCount ? maxAnswerOptionCount : 4).toString(),
		});
	}, [maxQuestionCount, maxAnswerOptionCount, updateData]);

	return {
		quiz,
		loading: loadingSubscription || loadingProducts || loadingQuiz,
		data,
		updateData,
		maxQuestionCount,
		maxAnswerOptionCount,
	};
};

export default useEditQuizQuestionGenerationData;
