import { Crud } from '@/components/Crud';
import { showToastSuccess } from '@/components/GlobalToast';
import { useDefaultTableConfig } from '@/hooks/useDefaultTableConfig';
import { IAnimal } from '@/interfaces/animal';
import { ITableConfig } from '@/interfaces/tableConfig';
import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimalsManagerForm } from './components/AnimalsManagerForm';
import {
	deleteAnimal,
	getTableAnimals,
	putUpdateAnimalStatus,
} from './services';

export const AnimalsManagerPage = () => {
	const mode = useSelector(selectorMode);
	const dispatch = useDispatch();
	const [rowSelected, setRowSelected] = useState<IAnimal | undefined>();
	const [tableConfig, setTableConfig] = useState<ITableConfig>(
		useDefaultTableConfig('name')
	);
	const { refetch: getAnimals, data } = getTableAnimals(tableConfig);
	const { mutateAsync: removeAnimal } = deleteAnimal(rowSelected?.id);

	const customColumn = (e: IAnimal) => {
		const newAnimalStatus =
			e.animalStatus === 'AVALIABLE' ? 'adopted' : 'avaliable';
		const { mutateAsync: updateAnimalStatus } = putUpdateAnimalStatus(
			e.id,
			newAnimalStatus
		);
		return (
			<>
				<Checkbox
					onChange={() => {
						updateAnimalStatus({});
					}}
					checked={e.animalStatus === 'AVALIABLE'}
				></Checkbox>
			</>
		);
	};

	const cols = [
		{ field: 'name', header: 'Name' },
		{ field: 'description', header: 'Description' },
		{ field: 'imageURL', header: 'imageURL' },

		{ field: 'birthdate', header: 'Birthdate' },
		{
			field: 'animalStatus',
			header: 'Status',
			type: 'custom',
			customColumn: customColumn,
		},
		{ field: 'category', header: 'Category', unsortable: true },
		{ field: 'age', header: 'Age', unsortable: true },
	];
	const colsSearch = [
		{ field: 'name', header: 'Name' },
		{ field: 'description', header: 'Description' },
	];

	const handleOnDelete = async (_row: any) => {
		await removeAnimal().then(() => {
			showToastSuccess('Operation completed successfully!');
		});
	};

	useEffect(() => {
		getAnimals();
	}, [tableConfig]);

	return (
		<Crud.Root title={'Animals'} setRowSelected={setRowSelected}>
			{(mode === 'edit' || mode === 'create') && (
				<AnimalsManagerForm
					setRowSelected={setRowSelected}
					rowSelected={rowSelected}
				/>
			)}
			{mode === 'search' && (
				<>
					<Crud.SearchBar
						columns={colsSearch}
						setTableConfig={setTableConfig}
					></Crud.SearchBar>
					<Toolbar
						className="m-3"
						start={
							<Button
								label="Add"
								onClick={() => {
									dispatch(setMode('create'));
								}}
							></Button>
						}
					></Toolbar>
					<Crud.Table
						data={data?.data?.list || []}
						columns={cols}
						setRowSelected={setRowSelected}
						setTableConfig={setTableConfig}
						onDelete={handleOnDelete}
						tableConfig={tableConfig}
						totalRecords={data?.data.totalRecords || 0}
					></Crud.Table>
				</>
			)}
		</Crud.Root>
	);
};
