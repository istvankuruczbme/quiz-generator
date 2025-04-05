import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type CategoryName = Readonly<
	| "history"
	| "geography"
	| "science"
	| "literature"
	| "art"
	| "music"
	| "movies"
	| "sports"
	| "technology"
	| "politics"
	| "food"
	| "travel"
	| "general knowledge"
>;
export type CategoryResponse = Readonly<{
	id: string;
	name: CategoryName;
}>;
export type Category = Readonly<{
	id: string;
	name: CategoryName;
	icon: IconDefinition;
}>;
