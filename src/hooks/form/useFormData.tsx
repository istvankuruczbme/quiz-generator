import { useState } from "react";

function useFormData<T>(initialData: T) {
	// #region States
	const [data, setData] = useState(initialData);
	//#endregion

	// #region Functions
	function updateData(newData: Partial<T>): void {
		setData((data) => ({ ...data, ...newData }));
	}
	//#endregion

	return [data, updateData] as const;
}

export default useFormData;
