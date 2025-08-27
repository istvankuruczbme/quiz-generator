import {
	DragEvent,
	forwardRef,
	InputHTMLAttributes,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from "react";
// Components
import Text from "../../ui/Text/Text";
import Button from "../../ui/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// Hooks
import useError from "../../../features/error/hooks/useError";
// Functions
import addPropClassName from "../../../utils/addPropClassName";
import validateImageFile from "../../../utils/image/validateImageFile";
import createImageUrl from "../../../utils/image/createImageUrl";
// CSS
import "./FileUpload.css";

type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
	uploadType?: "photo" | "file";
	defaultPhotoUrl?: string;
	onFileChange: (file: File | null, photoUrl?: string) => void;
};

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
	({ uploadType = "photo", defaultPhotoUrl, onFileChange, className, ...rest }, ref) => {
		// #region States
		const [filename, setFilename] = useState("");
		const [photoUrl, setPhotoUrl] = useState("");
		// #endregion

		// #region Hooks
		useEffect(() => {
			if (defaultPhotoUrl == undefined) return;

			setPhotoUrl(defaultPhotoUrl);
		}, [defaultPhotoUrl]);
		const { setError } = useError();
		//#endregion

		// #region Refs
		const dropZoneRef = useRef<HTMLLabelElement>(null);
		// #endregion

		// #region Functions
		function addDragOverClass(): void {
			// Check drop zone
			if (dropZoneRef.current == null) return;

			// Update state
			dropZoneRef.current.classList.add("fileUpload__drop--dragover");
		}

		function removeDragOverClass(): void {
			// Check drop zone
			if (dropZoneRef.current == null) return;

			// Update state
			dropZoneRef.current.classList.remove("fileUpload__drop--dragover");
		}

		function handleDragOver(e: DragEvent<HTMLLabelElement>): void {
			e.preventDefault();

			addDragOverClass();
		}

		function handleDragLeave(e: DragEvent<HTMLLabelElement>): void {
			e.preventDefault();

			removeDragOverClass();
		}

		function handleDrop(e: DragEvent<HTMLLabelElement>): void {
			e.preventDefault();

			// Get file
			const file = e.dataTransfer.files[0];

			// Validate file
			if (uploadType === "photo") {
				try {
					validateImageFile(file);
				} catch (err) {
					setError(err);
					removeDragOverClass();
					return;
				}
			}

			// Create data transfer
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);

			// Get file input
			const fileInput = document.querySelector(".fileUpload__input") as HTMLInputElement;

			// Update files of file input
			fileInput.files = dataTransfer.files;

			// Show feedback
			handleFileChange(file);

			// Check drop zone
			if (dropZoneRef.current == null) return;

			// Update state
			dropZoneRef.current.classList.remove("fileUpload__drop--dragover");
		}

		function handleFileChange(file?: File): void {
			// Check file
			if (!file) return;

			// Photo
			if (uploadType === "photo") {
				try {
					// Validation
					validateImageFile(file);

					// Create image URL
					const photoUrl = createImageUrl(file as File);

					// Update photoURL state
					setPhotoUrl(photoUrl);

					// Run custom handler
					onFileChange(file, photoUrl);
				} catch (err) {
					setError(err);
				}
			}

			// File
			if (uploadType === "file") {
				// Set filename
				setFilename(file.name);

				// Run custom handler
				onFileChange(file);
			}
		}

		function handleFileRemoveClick(e: MouseEvent<HTMLButtonElement>): void {
			e.preventDefault();

			// Get file input
			const fileInput = document.querySelector(".fileUpload__input") as HTMLInputElement;

			// Remove files
			fileInput.value = "";

			// Update state
			if (uploadType === "photo") setPhotoUrl("");
			if (uploadType === "file") setFilename("");

			// Run custom handler
			onFileChange(null);
		}
		// #endregion

		return (
			<div className={`fileUpload${addPropClassName(className)}`}>
				<label
					htmlFor={rest.id}
					className="fileUpload__drop"
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					ref={dropZoneRef}
				>
					<input
						type="file"
						id={rest.id}
						accept={uploadType === "photo" ? "image/*" : undefined}
						className="fileUpload__input"
						onChange={(e) => handleFileChange(e.target.files?.[0])}
						{...rest}
						ref={ref}
					/>

					{(photoUrl !== "" || filename !== "") && (
						<Button
							variant="neutral"
							className="fileUpload__remove"
							onClick={handleFileRemoveClick}
						>
							<FontAwesomeIcon icon={faXmark} />
							Remove
						</Button>
					)}

					{uploadType === "photo" && (
						<img src={photoUrl || undefined} className="fileUpload__img" />
					)}

					{photoUrl === "" && filename === "" && (
						<Text variant="neutral-400" mb="0">
							Click or drop the {uploadType === "photo" ? "photo" : "file"} here.
						</Text>
					)}
					{filename !== "" && (
						<Text variant="neutral-400" mb="0">
							Uploaded file: {filename}
						</Text>
					)}
				</label>
			</div>
		);
	}
);

export default FileUpload;
