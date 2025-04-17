import { ChangeEvent, FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import Page from "../../../../components/layout/Page/Page";
import NewQuizSection from "../../components/layout/NewQuizSection/NewQuizSection";
import BackButton from "../../../../components/ui/Button/BackButton/BackButton";
import FormInputsContainer from "../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../components/form/Input/Input";
import Textarea from "../../../../components/form/Textarea/Textarea";
import Text from "../../../../components/ui/Text/Text";
import FileUpload from "../../../../components/layout/FileUpload/FileUpload";
import CategorySelect from "../../../../components/form/Select/CategorySelect/CategorySelect";
import LoadingButton from "../../../../components/ui/Button/LoadingButton/LoadingButton";
// Hooks
import useError from "../../../ui/error/hooks/useError";
import { useNavigate } from "react-router-dom";
// Functions
import validateQuizData from "../../utils/validation/validateQuizData";
import createQuiz from "../../sevices/createQuiz";
// CSS
import "./NewQuiz.css";

type NewQuizProps = HTMLAttributes<HTMLDivElement>;

const NewQuiz: FC<NewQuizProps> = () => {
	// #region States
	const [loading, setLoading] = useState(false);
	const [description, setDescription] = useState("");
	// #endregion

	// #region Hooks
	const navigate = useNavigate();
	const { setError } = useError();
	// #endregion

	// #region Refs
	const titleRef = useRef<HTMLInputElement>(null);
	const photoRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	//#endregion

	// #region Variables
	const MAX_DESCRIPTION_LENGTH = 500;
	//#endregion

	// #region Functions
	function handleDescriptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
		// Get description length
		const descriptionLength = e.target.value.length;

		// Check if description length is below limit
		if (descriptionLength > MAX_DESCRIPTION_LENGTH) return;

		// Update description
		setDescription(e.target.value);
	}

	async function handleCreateQuizSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		// Input values
		const title = titleRef.current?.value;
		const photo = photoRef.current?.files?.[0];
		const categoryId = categoryRef.current?.value;

		try {
			// Validation
			validateQuizData(title, description, categoryId);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Create quiz
			const quiz = await createQuiz(
				title as string,
				description as string,
				photo,
				categoryId as string
			);

			// Navigation
			navigate(`/quizzes/${quiz.id}/edit`);
		} catch (err) {
			// console.log("Error creating the quiz.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<Page>
			<NewQuizSection>
				<BackButton to="/my-quizzes" variant="primary">
					My quizzes
				</BackButton>
				<Page.Title mb="0">New quiz</Page.Title>
			</NewQuizSection>

			<NewQuizSection>
				<form onSubmit={handleCreateQuizSubmit}>
					<FormInputsContainer>
						<Input
							type="text"
							label="Title"
							id="newQuizTitle"
							placeholder="Title"
							required
							ref={titleRef}
						/>
						<Textarea
							label="Description"
							id="newQuizDescription"
							placeholder="Description"
							required
							value={description}
							onChange={handleDescriptionChange}
						/>
						<Text variant="neutral-400" mb="0" className="newQuiz__description__length">
							{description.length}/{MAX_DESCRIPTION_LENGTH}
						</Text>

						<Text mb="-1rem">Photo</Text>
						<FileUpload uploadType="photo" ref={photoRef} />

						<CategorySelect ref={categoryRef} />
					</FormInputsContainer>

					<LoadingButton type="submit" full loading={loading}>
						Create quiz
					</LoadingButton>
				</form>
			</NewQuizSection>
		</Page>
	);
};

export default NewQuiz;
