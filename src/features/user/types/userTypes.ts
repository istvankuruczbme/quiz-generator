export type UserPublic = {
	id: string;
	name: string;
	photoUrl: string | null;
};
export type UserProfile = {
	id: string;
	name: string;
	email: string;
	photoUrl: string | null;
	updatedAt: Date;
	createdAt: Date;
};

export type InsertUserData = {
	id: string;
	name: string;
	email: string;
	photoUrl: string | null;
};
