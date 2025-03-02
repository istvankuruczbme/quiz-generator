export type User = {
	id: string;
	customerId: string;
	name: string;
	email: string;
	photoUrl: string | null;
	subscriptionId: string | null;
	updatedAt: Date;
	createdAt: Date;
	deletedAt: Date | null;
};
