const errors = {
	// #region Auth
	// Server
	"auth/unauthorized": {
		message: "Unauthorized request.",
		details: "Please sign in to make a request.",
	},
	// Client
	"auth/name-missing": {
		message: "Name missing.",
		details: "Please fill the name field.",
	},
	"auth/email-missing": {
		message: "Email missing",
		details: "Please fill the email field.",
	},
	"auth/email-invalid": {
		message: "Invalid email",
		details: "Please enter a valid email address.",
	},
	"auth/password-missing": {
		message: "Password missing",
		details: "Please fill the password field.",
	},
	"auth/password-too-short": {
		message: "Password too short",
		details: "Password must be at least 6 characters long.",
	},
	"auth/passwords-dont-match": {
		message: "Passwords don't match",
		details: "",
	},
	"auth/privacy-policy-invalid": {
		message: "Privacy policy is not accepted.",
		details: "",
	},
	"auth/email_exists": {
		message: "Email is in user.",
		details: "Enter a different email address.",
	},
	"auth/invalid_credentials": {
		message: "Email or password is wrong.",
		details: "",
	},
	"auth/same_password": {
		message: "Same password as currently.",
		details: "Please enter a different password.",
	},
	//#endregion

	// #region User
	// Server
	"user/not-created": {
		message: "Failed to create profile.",
		details: "",
	},
	"user/not-found": {
		message: "User not found.",
		details: "",
	},
	"user/subscription-missing": {
		message: "User does not have a subscription.",
		details: "Subscribe first and then make the request.",
	},
	"user/photo-url-missing": {
		message: "Photo URL missing.",
		details: "Please enter the URL of photo.",
	},
	"user/invalid-photo-url": {
		message: "Invalid photo URL.",
		details: "Please enter a valid photo URL.",
	},
	"user/category-ids-missing": {
		message: "Categories missing.",
		details: "Please select at least 1 category.",
	},
	"user/category-id-missing": {
		message: "Invalid category.",
		details: "",
	},
	"user/category-invalid-id": {
		message: "Invalid category.",
		details: "",
	},
	"user/quiz-count-error": {
		message: "Failed to query your quizzes.",
		details: "",
	},
	"user/max-number-of-quizzes-reached": {
		message: "You reached the max number of quizzes.",
		details: "Upgrade your subscription for more.",
	},
	// Client
	"user/name-missing": {
		message: "Name missing.",
		details: "Please fill the name field.",
	},
	"user/name-invalid": {
		message: "Name invalid.",
		details: "Please enter a valid name.",
	},
	"user/categories-missing": {
		message: "No categories selected.",
		details: "Select at least 1 category.",
	},
	//#endregion

	// #region Product
	// Server
	"price/id-missing": {
		message: "Subscription price missing.",
		details: "",
	},
	"price/id-invalid": {
		message: "Invalid subscription price.",
		details: "",
	},
	"checkout-session/url-missing": {
		message: "Payment URL missing.",
		details: "Try it again.",
	},
	"checkout-session/invalid-url": {
		message: "Invalid payment URL.",
		details: "Try it again.",
	},
	// #endregion

	// #region Subscription
	// Server
	"subscription/product-id-missing": {
		message: "Subscription product missing.",
		details: "",
	},
	"subscription/invalid-product-id": {
		message: "Subscription product invalid.",
		details: "",
	},
	"subscription/price-id-missing": {
		message: "Subscription price missing.",
		details: "",
	},
	"subscription/price-id-invalid": {
		message: "Invalid subscription price.",
		details: "",
	},
	"subscription/item-missing": {
		message: "Subscription product missing.",
		details: "",
	},
	"subscription/same-plan": {
		message: "Same subscription.",
		details: "Please select a different subscription.",
	},
	// #endregion

	// #region File
	"file/missing": {
		message: "There is no file.",
		details: "Select a file by clicking on the button.",
	},
	"file/not-an-image": {
		message: "The selected file is not an image.",
		details: "Please select an image file.",
	},
	"file/not-a-text-file": {
		message: "The selected file is not an text file.",
		details: "Please select a file with extension .txt / .md / .docx / .pdf.",
	},
	// #endregion

	// #region Quiz
	// Server
	"quiz/id-missing": {
		message: "Quiz ID missing.",
		details: "",
	},
	"quiz/invalid-id": {
		message: "Invalid quiz ID.",
		details: "",
	},
	"quiz/not-found": {
		message: "Quiz not found.",
		details: "",
	},
	"quiz/completion-count-missing": {
		message: "Quiz completion count missing.",
		details: "",
	},
	"quiz/not-modifiable": {
		message: "Quiz cannot be modified.",
		details: "",
	},
	"quiz/category-id-missing": {
		message: "Quiz category missing.",
		details: "Please fill the category field.",
	},
	"quiz/category-invalid-id": {
		message: "Invalid quiz category.",
		details: "Please select a valid quiz category.",
	},
	"quiz/embedding-values-missing": {
		message: "Failed to create quiz.",
		details: "",
	},
	"quiz/not-created": {
		message: "Failed to create quiz.",
		details: "",
	},
	"quiz/config/not-created": {
		message: "Failed to create quiz.",
		details: "",
	},
	"quiz/config/visibility-missing": {
		message: "Quiz visibility missing.",
		details: "Please select a visibility option.",
	},
	"quiz/config/visibility-invalid": {
		message: "Invalid quiz visibility.",
		details: "Please select a valid visibility option.",
	},
	"quiz/config/question-order-missing": {
		message: "Question order missing.",
		details: "Please select a question order option.",
	},
	"quiz/config/question-order-invalid": {
		message: "Invalid question order.",
		details: "Please select a valid question order option.",
	},
	"quiz/questions/invalid-data": {
		message: "Invalid question data.",
		details: "Please sort the questions with drag-and-drop.",
	},
	"quiz/questions/question-missing": {
		message: "Quiz question missing.",
		details: "",
	},
	"quiz/questions/question-id-missing": {
		message: "Quiz question missing.",
		details: "",
	},
	"quiz/questions/question-invalid-id": {
		message: "Invalid quiz question.",
		details: "",
	},
	"quiz/questions/question-not-found": {
		message: "Quiz question not found.",
		details: "",
	},
	"quiz/max-number-of-questions-reached": {
		message: "Question limit reached.",
		details: "",
	},
	"quiz/questions/generation-doc-count-limit-reached": {
		message: "Quiz documents limit reached.",
		details: "",
	},
	"quiz/questions/generation-strategy-missing": {
		message: "Generation strategy missing.",
		details: "Please select a generation strategy.",
	},
	"quiz/questions/generation-strategy-invalid": {
		message: "Invalid generation strategy.",
		details: "Please select a valid generation strategy.",
	},
	"quiz/questions/generation-creativity-missing": {
		message: "Creativity missing.",
		details: "Please fill creativity field.",
	},
	"quiz/questions/generation-creativity-invalid": {
		message: "Invalid creativity.",
		details: "Please enter a value between 0 and 100 for creativity.",
	},
	"quiz/questions/generation-question-count-missing": {
		message: "Question count missing.",
		details: "Please fill number of questions field.",
	},
	"quiz/questions/generation-question-count-invalid": {
		message: "Invalid question count.",
		details:
			"Total number of questions must be lower than question count based on your subscription.",
	},
	"quiz/questions/generation-answer-option-count-missing": {
		message: "Answer option count missing.",
		details: "Please fill number of answer options field.",
	},
	"quiz/questions/generation-answer-option-count-invalid": {
		message: "Invalid answer option count.",
		details:
			"Number of answer options must be lower than answer option count count based on your subscription.",
	},
	// Client
	"quiz/title-missing": {
		message: "Title missing.",
		details: "Please fill the title field.",
	},
	"quiz/title-invalid": {
		message: "Invalid title.",
		details: "Please enter a valid title.",
	},
	"quiz/description-missing": {
		message: "Description missing.",
		details: "Please fill the description field.",
	},
	"quiz/description-invalid": {
		message: "Invalid description.",
		details: "Please enter a valid description.",
	},
	"quiz/category-missing": {
		message: "Category missing.",
		details: "Please fill the category field.",
	},
	"quiz/generation/file-invalid-type": {
		message: "The selected file is not a text file.",
		details: "Please select a .txt / .md / .pdf / .docx file.",
	},
	"quiz/generation/strategy-invalid": {
		message: "The selected strategy is invalid.",
		details: "",
	},
	"quiz/generation/creativity-missing": {
		message: "Value for creativity missing.",
		details: "Please set the input to correct it.",
	},
	"quiz/generation/creativity-invalid": {
		message: "Value for creativity is invalid.",
		details: "Please set the input between 0% and 100%.",
	},
	"quiz/generation/question-count-invalid": {
		message: "Invalid question count.",
		details: "It must be greater or equal than 1.",
	},
	"quiz/generation/answer-option-count-invalid": {
		message: "Invalid answer option count.",
		details: "It must be greater or equal than 1.",
	},
	"quiz/questions/generation-language-invalid": {
		message: "Invalid document language.",
		details: "Language of document must be one of the following: english, hungarian.",
	},
	"quiz/generation/no-openai-response": {
		message: "Failed to generate questions.",
		details: "",
	},
	"quiz/generation/file-exists": {
		message: "Selected document already exists.",
		details:
			"You already generated questions from this document. Rename it or use a different one.",
	},
	// #endregion

	// #region Question
	// Server
	"question/order-missing": {
		message: "Question order missing.",
		details: "Please fill order field.",
	},
	"question/order-invalid": {
		message: "Invalid question order.",
		details: "Question order must be greater than 0.",
	},
	"question/answer-options-missing": {
		message: "Answer options missing.",
		details: "Please add answer options to the question.",
	},
	"question/answer-option-missing": {
		message: "Invalid answer option.",
		details: "",
	},
	"question/answer-option-invalid": {
		message: "Invalid answer option.",
		details: "",
	},
	"question/answer-option-id-missing": {
		message: "Invalid answer option.",
		details: "",
	},
	"question/answer-option-invalid-id": {
		message: "Invalid answer option.",
		details: "",
	},
	"question/correct-answer-option-missing": {
		message: "No correct answer option.",
		details: "Please select at least 1 correct answer option.",
	},
	"question/points/correct-missing": {
		message: "Correct points missing.",
		details: "Please fill correct points field.",
	},
	"question/points/correct-invalid": {
		message: "Invalid correct points.",
		details: "Please enter a number for correct points.",
	},
	"question/points/wrong-missing": {
		message: "wrong points missing.",
		details: "Please fill wrong points field.",
	},
	"question/points/wrong-invalid": {
		message: "Invalid wrong points.",
		details: "Please enter a number for wrong points.",
	},
	"question/points/empty-missing": {
		message: "empty points missing.",
		details: "Please fill empty points field.",
	},
	"question/points/empty-invalid": {
		message: "Invalid empty points.",
		details: "Please enter a number for empty points.",
	},
	"question/not-created": {
		message: "Failed to create question.",
		details: "",
	},
	"question/points/not-created": {
		message: "Failed to create question points.",
		details: "",
	},
	"question/answer-option-not-created": {
		message: "Failed to create answer option.",
		details: "",
	},
	// Client
	"question/text-missing": {
		message: "Question text missing.",
		details: "Please fill question field.",
	},
	"question/text-invalid": {
		message: "Invalid question text.",
		details: "Please enter a valid question.",
	},
	"question/correct-points-missing": {
		message: "Correct points missing.",
		details: "Please fill correct points field.",
	},
	"question/correct-points-invalid": {
		message: "Correct points invalid.",
		details: "Please enter a valid number for correct points field.",
	},
	"question/wrong-points-missing": {
		message: "Wrong points missing.",
		details: "Please fill wrong points field.",
	},
	"question/wrong-points-invalid": {
		message: "Correct points invalid.",
		details: "Please enter a valid number for correct points field.",
	},
	"question/empty-points-missing": {
		message: "Empty points missing.",
		details: "Please fill empty points field.",
	},
	"question/empty-points-invalid": {
		message: "Empty points invalid.",
		details: "Please enter a valid number for empty points field.",
	},
	// #endregion

	// #region Answer options
	"question/answer-option-text-missing": {
		message: "Asnwer option text missing.",
		details: "Please fill answer option's text field.",
	},
	// #endregion

	// #region General
	"request/body-invalid": {
		message: "Invalid request.",
		details: "",
	},

	// #endregion

	default: {
		message: "An unknown error occured.",
		details: "Please try again later.",
	},
} as const;

export type ErrorCode = keyof typeof errors;
export type ErrorDetails = (typeof errors)[ErrorCode];

export default errors;
