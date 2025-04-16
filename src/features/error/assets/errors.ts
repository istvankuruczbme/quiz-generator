const errors = {
	// #region Auth
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
	"user/name-missing": {
		message: "Name missing.",
		details: "Please fill the name field.",
	},
	"user/categories-missing": {
		message: "No categories selected.",
		details: "Select at least 1 category.",
	},
	//#endregion

	// #region File
	"file/missing": {
		message: "There is no file.",
		details: "Select a file by clicking on the button.",
	},
	"file/not-an-image": {
		message: "The selected file is not an image.",
		details: "Please select an image file.",
	},
	// #endregion

	// #region Quiz
	"quiz/title-missing": {
		message: "Title missing.",
		details: "Please fill the title field.",
	},
	"quiz/description-missing": {
		message: "Description missing.",
		details: "Please fill the description field.",
	},
	"quiz/category-missing": {
		message: "Category missing.",
		details: "Please fill the category field.",
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
