import { back_url } from '@/api/axios';
import { Dialog } from 'primereact/dialog';
import { Dispatch, SetStateAction } from 'react';

interface ImageDialogProps {
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	setRowSelected: Dispatch<SetStateAction<any>>;
	isVisible: boolean;
	imageId?: number;
}
export const ImageDialog = ({
	isVisible,
	setIsVisible,
	setRowSelected,
	imageId,
}: ImageDialogProps) => {
	return (
		<Dialog
			visible={isVisible}
			onHide={() => {
				setIsVisible(false);
				setRowSelected(undefined);
			}}
		>
			{imageId ? (
				<img
					style={{ maxHeight: '400px', maxWidth: '400px' }}
					src={`${back_url}/image/${imageId}`}
					alt="Image"
				/>
			) : (
				<h4>Image Not Found!</h4>
			)}
		</Dialog>
	);
};
