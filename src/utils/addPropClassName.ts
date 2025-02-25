export default function addPropClassName(className = ""): string {
	if (className === "") return "";
	return ` ${className}`;
}
