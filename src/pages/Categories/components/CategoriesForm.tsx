import { ErrorMessage } from '@/components/ErrorMessage';
import { showToastSuccess } from '@/components/GlobalToast';
import { ICategory } from '@/interfaces/category';
import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { postNewCategory, putUpdateCategory } from '../services';

interface CategoriesFormProps {
	rowSelected?: ICategory;
	setRowSelected: Dispatch<SetStateAction<ICategory | undefined>>;
}
export const CategoriesForm = ({
	rowSelected,
	setRowSelected,
}: CategoriesFormProps) => {
	const mode = useSelector(selectorMode);
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ defaultValues: rowSelected });

	const { mutateAsync: newCategory } = postNewCategory();
	const { mutateAsync: updateCategory } = putUpdateCategory(rowSelected?.id);

	const handleCreate = (data: ICategory) => {
		newCategory(
			{
				name: data.name,
			},
			{
				onSuccess: () => {
					showToastSuccess('Operation completed successfully!');
					dispatch(setMode('search'));
				},
			}
		);
	};
	const handleUpdate = (data: any) => {
		updateCategory(
			{
				id: data.id,
				name: data.name,
			},
			{
				onSuccess: () => {
					showToastSuccess('Operation completed successfully!');
					dispatch(setMode('search'));
				},
			}
		);
	};
	const onSubmit = (data: any) => {
		if (mode === 'create') handleCreate(data);
		if (mode === 'edit') handleUpdate(data);
	};

	useEffect(() => {
		return () => {
			setRowSelected(undefined);
		};
	}, []);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="page-container full-height"
		>
			<div className="full-height mx-2">
				<div className="flex flex-column md:flex-row">
					<div className="col-12">
						<label className="font-bold">Name *</label>
						<InputText
							className={classNames('w-full my-1', {
								'p-invalid': errors.name,
							})}
							placeholder={'Name *'}
							id="name"
							{...register('name', {
								required: true,
							})}
						/>
						<ErrorMessage errors={errors.name} />
					</div>
				</div>
			</div>

			<div className="flex justify-content-end m-2">
				<div className="mr-2">
					<Button
						type="button"
						text
						label={'Return'}
						onClick={() => {
							dispatch(setMode('search'));
						}}
					></Button>
				</div>
				<div>
					<Button label={'Save'}></Button>
				</div>
			</div>
		</form>
	);
};
