import { IMode } from '@/interfaces/mode';
import { setMode } from '@/redux/Reducers/modeReducer';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dispatch, SetStateAction } from 'react';
import { MdClose, MdCreate, MdVisibility } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { CrudTableActions } from '../CrudTableActions';

interface CrudTableDefaultActions {
	rowSelected: any;
	actions?: IMode[];
	setRowSelected: Dispatch<SetStateAction<any>>;
	onDelete?: (rowSelected: any) => Promise<void>;
}
export const CrudTableDefaultActions = ({
	rowSelected,
	actions,
	setRowSelected,
	onDelete,
}: CrudTableDefaultActions) => {
	const dispatch = useDispatch();
	const showEdit = !actions ? true : actions?.includes('edit');
	const showDelete = !actions ? true : actions?.includes('delete');
	const showView = !actions ? false : actions?.includes('view');

	const handleDefaultEdit = (rowSelected: any) => {
		setRowSelected(rowSelected);
		dispatch(setMode('edit'));
	};

	const handleDefaultView = (rowSelected: any) => {
		setRowSelected(rowSelected);
	};

	const handleDefaultDelete = (rowSelected: any) => {
		setRowSelected(rowSelected);
		confirmDialog({
			message: 'Do you really want to delete this item?',
			header: 'Confirmation',
			icon: 'pi pi-info-circle',
			defaultFocus: 'reject',
			acceptClassName: 'p-button-danger',
			acceptLabel: 'Remove',
			rejectLabel: 'Cancel',
			accept: () => {
				{
					onDelete && onDelete(rowSelected);
				}
			},
		});
	};

	return (
		<CrudTableActions>
			<>
				{showView && (
					<div>
						<Button
							text
							onClick={() => {
								handleDefaultView(rowSelected);
							}}
						>
							<MdVisibility className="mr-2" size="20" /> Visualizar
						</Button>
					</div>
				)}
				{showEdit && (
					<div>
						<Button
							text
							severity="secondary"
							onClick={() => {
								handleDefaultEdit(rowSelected);
							}}
						>
							<MdCreate className="mr-2" size="20" />
							Editar
						</Button>
					</div>
				)}
				{showDelete && (
					<div>
						<Button
							text
							severity="danger"
							onClick={() => {
								handleDefaultDelete(rowSelected);
							}}
						>
							<MdClose className="mr-2" size="20" /> Deletar
						</Button>
					</div>
				)}
			</>
		</CrudTableActions>
	);
};
