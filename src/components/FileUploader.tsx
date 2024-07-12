import { Button } from 'primereact/button';
import {
	FileUpload,
	FileUploadHeaderTemplateOptions,
	FileUploadSelectEvent,
	ItemTemplateOptions,
} from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { useRef, useState } from 'react';
import { MdClose, MdImage } from 'react-icons/md';

interface FileUploaderProps {
	onRemove?: () => void;
	onSelect: (e: FileUploadSelectEvent) => Promise<void>;
}
export const FileUploader = ({ onSelect, onRemove }: FileUploaderProps) => {
	const [totalSize, setTotalSize] = useState(0);
	const fileUploadRef = useRef<FileUpload>(null);

	const onTemplateSelect = (e: FileUploadSelectEvent) => {
		let _totalSize = totalSize;
		let files = e.files;

		Object.keys(files).forEach((key: any) => {
			_totalSize += files[key].size || 0;
		});
		if (files.length <= 0) return;
		onSelect(e).then(() => {
			setTotalSize(_totalSize);
		});
	};

	const onTemplateRemove = (file: File, callback: Function) => {
		setTotalSize(totalSize - file.size);
		callback();
	};

	const onTemplateClear = () => {
		{
			onRemove && onRemove();
		}
		setTotalSize(0);
	};

	const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
		const { className, chooseButton } = options;

		return (
			<div
				className={className}
				style={{
					backgroundColor: 'transparent',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{chooseButton}
			</div>
		);
	};

	const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
		const file = inFile as File;
		return (
			<div className="flex align-items-center flex-wrap">
				<div className="flex align-items-center" style={{ width: '40%' }}>
					<img
						alt={file.name}
						role="presentation"
						//@ts-ignore
						src={file.objectURL}
						width={100}
					/>
					<span className="flex flex-column text-left ml-3">
						{file.name}
						<small>{new Date().toLocaleDateString()}</small>
					</span>
				</div>
				<Tag
					value={props.formatSize}
					severity="warning"
					className="px-3 py-2"
				/>
				<Button
					type="button"
					icon={<MdClose size="20" />}
					className="p-button-outlined p-button-rounded p-button-danger ml-auto"
					onClick={() => onTemplateRemove(file, props.onRemove)}
				/>
			</div>
		);
	};

	const emptyTemplate = () => {
		return (
			<div className="flex align-items-center flex-column">
				<div
					className="mt-3 p-5"
					style={{
						borderRadius: '50%',
						backgroundColor: 'var(--surface-b)',
						color: 'var(--surface-d)',
					}}
				>
					<MdImage size="40"></MdImage>
				</div>
				<span
					style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }}
					className="my-5"
				>
					Drag and Drop Image Here
				</span>
			</div>
		);
	};

	const chooseOptions = {
		icon: <MdImage />,
		iconOnly: true,
		className: 'custom-choose-btn p-button-rounded p-button-outlined',
	};

	return (
		<div>
			<Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
			<FileUpload
				ref={fileUploadRef}
				name="demo[]"
				url="/api/upload"
				accept=".jpg, .png"
				maxFileSize={1000000}
				onSelect={onTemplateSelect}
				onError={onTemplateClear}
				onClear={onTemplateClear}
				headerTemplate={headerTemplate}
				itemTemplate={itemTemplate}
				emptyTemplate={emptyTemplate}
				chooseOptions={chooseOptions}
			/>
		</div>
	);
};
