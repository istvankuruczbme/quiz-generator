import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import ButtonSkeleton from "../../../../../components/ui/Skeleton/ButtonSkeleton/ButtonSkeleton";
import InputSkeleton from "../../../../../components/ui/Skeleton/InputSkeleton/InputSkeleton";

const PasswordResetFormSkeleton = () => {
	return (
		<div>
			<FormInputsContainer>
				<InputSkeleton />
				<InputSkeleton />
				<InputSkeleton />
			</FormInputsContainer>

			<ButtonSkeleton />
		</div>
	);
};

export default PasswordResetFormSkeleton;
