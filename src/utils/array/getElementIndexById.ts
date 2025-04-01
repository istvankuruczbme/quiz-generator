type Element = {
	id: string;
};

export default function getElementIndexById(elements: Element[], id: string): number {
	return elements.findIndex((element) => element.id === id);
}
