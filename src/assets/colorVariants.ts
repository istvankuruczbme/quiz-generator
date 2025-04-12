const colorVariants = [
	"primary",
	"secondary",
	"accent",
	"neutral",
	"success",
	"danger",
	"info",
] as const;

export type ColorVariant = (typeof colorVariants)[number];

export default colorVariants;
