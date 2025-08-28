// Edit user
export const EDIT_USER_FORM_DATA = {
	name: "",
	photoUrl: "",
	photo: null as File | null,
};
export type EditUserFormData = typeof EDIT_USER_FORM_DATA;

// Edit user categories
export const EDIT_USER_CATEGORIES_FORM_DATA = {
	categoryIds: [] as string[],
};
export type EditUserCategoriesFormData = typeof EDIT_USER_CATEGORIES_FORM_DATA;
