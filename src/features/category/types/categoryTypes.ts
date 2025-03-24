export type CategoryName =
	| "History"
	| "Geography"
	| "Science"
	| "Literature"
	| "Art"
	| "Music"
	| "Movies"
	| "Sports"
	| "Technology"
	| "Politics"
	| "Food"
	| "Travel"
	| "General Knowledge";
export type Category = {
	id: string;
	name: CategoryName;
};
