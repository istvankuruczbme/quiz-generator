import { categories } from "../assets/categories";

export type CategoryName = (typeof categories)[number]["name"];
