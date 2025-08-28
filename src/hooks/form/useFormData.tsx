import { useCallback, useState } from "react";

function useFormData<T>(initialData: T) {
	// #region States
	const [data, setData] = useState(initialData);
	//#endregion

	// #region Functions
	const updateData = useCallback((newData: Partial<T>) => {
		setData((data) => ({ ...data, ...newData }));
	}, []);
	//#endregion

	return [data, updateData] as const;
}

export default useFormData;
