import { ErrorMessage } from '@/components/ErrorMessage';
import { showToastSuccess } from '@/components/GlobalToast';
import { IAnimal } from '@/interfaces/animal';
import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { AnimalStatus } from '@/utils/enums/animalStatus';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCategoryDropdown,
	postNewAnimal,
	putUpdateAnimal,
} from '../services';

interface AnimalsManagerFormProps {
	rowSelected?: IAnimal;
	setRowSelected: Dispatch<SetStateAction<IAnimal | undefined>>;
}
export const AnimalsManagerForm = ({
	rowSelected,
	setRowSelected,
}: AnimalsManagerFormProps) => {
	const mode = useSelector(selectorMode);
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm({ defaultValues: rowSelected });

	const { mutateAsync: newAnimal } = postNewAnimal();
	const { mutateAsync: updateAnimal } = putUpdateAnimal(rowSelected?.id);
	const { data: categoryDropdown } = getCategoryDropdown();

	const handleCreate = (data: IAnimal) => {
		newAnimal(
			{
				name: data.name,
				description: data.description,
				imageURL: data.imageURL,
				categoryId: data.categoryId,
				birthdate: data.birthdate,
				animalStatus: data.animalStatus,
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
		updateAnimal(
			{
				id: data.id,
				name: data.name,
				description: data.description,
				imageURL: data.imageURL,
				categoryId: data.categoryId,
				birthdate: data.birthdate,
				animalStatus: data.animalStatus,
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
					<div className="col-12 md:col-6 pb-0">
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
					<div className="col-12 md:col-6 pb-0">
						<label className="font-bold">Description *</label>
						<InputText
							className={classNames('w-full my-1', {
								'p-invalid': errors.description,
							})}
							placeholder={'Description *'}
							id="description"
							{...register('description', {
								required: true,
							})}
						/>
						<ErrorMessage errors={errors.description} />
					</div>
				</div>
				<div className="flex flex-column md:flex-row">
					<div className="col-12 md:col-6 pb-0">
						<label className="font-bold">imageURL *</label>
						<InputText
							className={classNames('w-full my-1', {
								'p-invalid': errors.imageURL,
							})}
							placeholder={'imageURL *'}
							id="imageURL"
							{...register('imageURL', {
								required: true,
							})}
						/>
						<ErrorMessage errors={errors.imageURL} />
					</div>
					<div className="col-12 md:col-6 pb-0">
						<label className="font-bold">Category *</label>
						<Controller
							name="categoryId"
							control={control}
							render={({ field: { onChange, name, value } }) => {
								return (
									<>
										<Dropdown
											name={name}
											className={classNames('w-full my-1', {
												'p-invalid': errors.categoryId,
											})}
											onChange={(e) => {
												onChange(e.value);
											}}
											placeholder={'Status *'}
											value={value}
											options={categoryDropdown?.data?.list || []}
											optionLabel="name"
											optionValue="id"
											id="categoryId"
										/>
										<ErrorMessage errors={errors.categoryId} />
									</>
								);
							}}
						/>
					</div>
				</div>
				<div className="flex flex-column md:flex-row">
					<div className="col-12 md:col-6 pb-0">
						<label className="font-bold">Birthdate *</label>
						<InputMask
							className={classNames('w-full my-1', {
								'p-invalid': errors.birthdate,
							})}
							placeholder={'Birthday *'}
							mask="99/99/9999"
							id="birthdate"
							{...register('birthdate', {
								required: true,
								validate: (e) => {
									return moment(e, 'YY/MM/YYYY').isValid() || 'Date Not Valid';
								},
							})}
						/>
						<ErrorMessage errors={errors.birthdate} />
					</div>
					<div className="col-12 md:col-6 pb-0">
						<label className="font-bold">Status *</label>
						<Controller
							name="animalStatus"
							control={control}
							render={({ field: { onChange, name, value } }) => {
								return (
									<>
										<Dropdown
											name={name}
											className={classNames('w-full my-1', {
												'p-invalid': errors.animalStatus,
											})}
											onChange={(e) => {
												onChange(e.value);
											}}
											placeholder={'Status *'}
											value={value}
											options={Object.values(AnimalStatus)}
											id="animalStatus"
										/>
										<ErrorMessage errors={errors.animalStatus} />
									</>
								);
							}}
						/>
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
