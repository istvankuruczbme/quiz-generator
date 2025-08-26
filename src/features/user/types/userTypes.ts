export type UserPublic = Readonly<{
	id: string;
	name: string;
	photoUrl: string | null;
}>;
export type UserProfile = Readonly<{
	id: string;
	name: string;
	photoUrl: string | null;
	hasSubscription: boolean;
	updatedAt: Date;
	createdAt: Date;
}>;

export type InsertUserData = Readonly<{
	id: string;
	name: string;
	email: string;
	photoUrl: string | null;
}>;
