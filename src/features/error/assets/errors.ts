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
	//#endregion

	default: {
		message: "An unknown error occured.",
		details: "Please try again later.",
	},
} as const;

export type ErrorCode = keyof typeof errors;
export type ErrorDetails = (typeof errors)[ErrorCode];

export default errors;
