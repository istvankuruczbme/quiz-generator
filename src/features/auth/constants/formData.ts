// Sign up
export const SIGN_UP_FORM_DATA = {
	name: "",
	email: "",
	password: "",
	passwordConfirm: "",
	policy: false,
};
export type SignUpFormData = typeof SIGN_UP_FORM_DATA;

// Sign in
export const SIGN_IN_FORM_DATA = {
	email: "",
	password: "",
};
export type SignInFormData = typeof SIGN_IN_FORM_DATA;

// Password reset email
export const PASSWORD_RESET_EMAIL_FORM_DATA = {
	email: "",
};
export type PasswordResetEmailFormData = typeof PASSWORD_RESET_EMAIL_FORM_DATA;

// Password reset
export const PASSWORD_RESET_FORM_DATA = {
	email: "",
	password: "",
	passwordConfirm: "",
};
export type PasswordResetFormData = typeof PASSWORD_RESET_FORM_DATA;

// Change email
export const CHANGE_EMAIL_FORM_DATA = {
	email: "",
};
export type ChangeEmailFormData = typeof CHANGE_EMAIL_FORM_DATA;

// Change passsword
export const CHANGE_PASSOWORD_FORM_DATA = {
	password: "",
	passwordConfirm: "",
};
export type ChangePasswordFormData = typeof CHANGE_PASSOWORD_FORM_DATA;
