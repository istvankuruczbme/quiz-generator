import FormInputsContainer from "../../../../../../components/form/FormInputsContainer/FormInputsContainer";
import FlexContainer from "../../../../../../components/layout/FlexContainer/FlexContainer";
import ButtonSkeleton from "../../../../../../components/ui/Skeleton/ButtonSkeleton/ButtonSkeleton";
import InputSkeleton from "../../../../../../components/ui/Skeleton/InputSkeleton/InputSkeleton";
import "./EditQuizConfigFormSkeleton.css";

const EditQuizConfigFormSkeleton = () => {
	return (
		<div>
			<FormInputsContainer>
				<FlexContainer gap="2rem">
					<InputSkeleton className="editQuizConfigFormSkeleton__input" />
					<InputSkeleton className="editQuizConfigFormSkeleton__input" />
				</FlexContainer>
			</FormInputsContainer>

			<ButtonSkeleton />
		</div>
	);
};

export default EditQuizConfigFormSkeleton;
