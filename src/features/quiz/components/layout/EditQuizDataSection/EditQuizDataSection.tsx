import { FC, FormEvent, HTMLAttributes, useRef, useState } from "react";
// Components
import EditQuizSection from "../EditQuizSection/EditQuizSection";
import Section from "../../../../../components/layout/Section/Section";
import FormInputsContainer from "../../../../../components/form/FormInputsContainer/FormInputsContainer";
import Input from "../../../../../components/form/Input/Input";
import QuizDescriptionTextarea from "../../form/QuizDescriptionTextarea/QuizDescriptionTextarea";
import Text from "../../../../../components/ui/Text/Text";
import CategorySelect from "../../../../category/components/form/CategorySelect/CategorySelect";
import FileUpload from "../../../../../components/layout/FileUpload/FileUpload";
import LoadingButton from "../../../../../components/ui/Button/LoadingButton/LoadingButton";
import Button from "../../../../../components/ui/Button/Button";
import DeleteQuizPhotoModal from "../DeleteQuizPhotoModal/DeleteQuizPhotoModal";
import FormButtonsContainer from "../../../../../components/form/FormButtonsContainer/FormButtonsContainer";
// Hooks
import useQuizData from "../../../hooks/useQuizData";
import useQuizPrivate from "../../../contexts/QuizPrivateContext/useQuizPrivate";
import useError from "../../../../error/hooks/useError";
import useFeedback from "../../../../ui/feedback/contexts/FeedbackContext/useFeedback";
// Functions
import validateQuizData from "../../../utils/validation/validateQuizData";
import updateQuizData from "../../../sevices/updateQuizData";
// CSS
import "./EditQuizDataSection.css";
import Accordion from "../../../../../components/layout/Accordion/Accordion";
import Skeleton from "../../../../../components/ui/Skeleton/Skeleton";

type EditQuizDataSectionProps = HTMLAttributes<HTMLDivElement>;

const EditQuizDataSection: FC<EditQuizDataSectionProps> = () => {
	// #region States
	const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);
	const [loading, setLoading] = useState(false);
	// #endregion

	// #region Refs
	const photoRef = useRef<HTMLInputElement>(null);
	//#endregion

	// #region Hooks
	const { quiz, loading: loadingQuiz, updateQuizState } = useQuizPrivate();
	const {
		title,
		setTitle,
		description,
		setDescription,
		photoUrl,
		setPhotoUrl,
		category,
		setCategory,
	} = useQuizData(quiz);
	const { setError } = useError();
	const { setFeedback } = useFeedback();
	// #endregion

	// #region Variables
	const hasQuizPhoto = quiz?.photoUrl !== null;
	// #endregion

	//#region Functions
	async function handleUpdateQuizData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Check quiz
		if (quiz == null) return;

		setLoading(true);

		// Input values
		const photo = photoRef.current?.files?.[0];

		try {
			// Validation
			validateQuizData(title, description, category);
		} catch (err) {
			setError(err);
			setLoading(false);
			return;
		}

		try {
			// Update quiz data
			await updateQuizData(quiz.id, title as string, description as string, photo, category);

			// Update quiz state
			await updateQuizState();

			// Show feedback
			setFeedback({
				type: "success",
				message: "Quiz updated.",
			});
		} catch (err) {
			// console.log("Error updating quiz data.", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}
	//#endregion

	return (
		<EditQuizSection>
			<Accordion defaultOpen>
				<Accordion.Header>
					<Section.Title mb="0">Quiz data</Section.Title>
				</Accordion.Header>

				<Accordion.Body>
					<DeleteQuizPhotoModal
						show={showDeletePhotoModal}
						setShow={setShowDeletePhotoModal}
						setPhotoUrl={setPhotoUrl}
					/>

					<form onSubmit={handleUpdateQuizData}>
						<FormInputsContainer>
							{loadingQuiz && (
								<>
									<Skeleton type="rect" width="100%" height="3rem" />
									<Skeleton type="rect" width="100%" height="7rem" />
									<Skeleton type="rect" width="100%" height="3rem" />
									<Skeleton type="rect" width="100%" height="15rem" />
								</>
							)}

							{!loadingQuiz && (
								<>
									<Input
										type="text"
										id="editQuizTitle"
										label="Title"
										placeholder="Title"
										required
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>

									<QuizDescriptionTextarea
										description={description}
										setDescription={setDescription}
									/>

									<CategorySelect
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									/>

									<Text mb="-1rem">Photo</Text>
									<FileUpload
										uploadType="photo"
										defaultPhotoUrl={photoUrl || undefined}
										deleteFileButton={
											hasQuizPhoto ? (
												<Button
													variant="danger"
													onClick={() => setShowDeletePhotoModal(true)}
												>
													Delete photo
												</Button>
											) : null
										}
										ref={photoRef}
									/>
								</>
							)}
						</FormInputsContainer>

						<FormButtonsContainer>
							<Button variant="neutral">Preview</Button>
							<LoadingButton type="submit" full loading={loading}>
								Save
							</LoadingButton>
						</FormButtonsContainer>
					</form>
				</Accordion.Body>
			</Accordion>
		</EditQuizSection>
	);
};

export default EditQuizDataSection;
