import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import ButtonSkeleton from "../../../../../components/ui/Skeleton/ButtonSkeleton/ButtonSkeleton";
import FileUploadSkeleton from "../../../../../components/ui/Skeleton/FileUploadSkeleton/FileUploadSkeleton";
import InputSkeleton from "../../../../../components/ui/Skeleton/InputSkeleton/InputSkeleton";

const EditUserFormSkeleton = () => {
	return (
		<div>
			<FormInputsContainer>
				<FileUploadSkeleton />
				<InputSkeleton />
			</FormInputsContainer>

			<ButtonSkeleton />
		</div>
	);
};

export default EditUserFormSkeleton;
