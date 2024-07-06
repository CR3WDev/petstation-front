import { Crud } from '@/components/Crud';
import { useDefaultTableConfig } from '@/hooks/useDefaultTableConfig';
import { IAnimal } from '@/interfaces/animal';
import { ITableConfig } from '@/interfaces/tableConfig';
import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnimal, getTableAnimals } from './services';

export const AnimalsManagerPage = () => {
	const mode = useSelector(selectorMode);
	const dispatch = useDispatch();
	const [rowSelected, setRowSelected] = useState<IAnimal | undefined>();
	const [tableConfig, setTableConfig] = useState<ITableConfig>(
		useDefaultTableConfig('name')
	);
	const { refetch: getProducts, data } = getTableAnimals(tableConfig);
	const { mutateAsync: removeProducts } = deleteAnimal(rowSelected?.id);

	const cols = [
		{ field: 'name', header: 'Name' },
		{ field: 'description', header: 'Description' },
		{ field: 'imageURL', header: 'imageURL' },
		{ field: 'category', header: 'Category' },
		{ field: 'animalStatus', header: 'Status' },
		{ field: 'dateBirth', header: 'Birthday' },
	];
	const colsPesquisa = [{ field: 'name', header: 'Produto' }];

	const handleOnDelete = async (_row: any) => {
		await removeProducts();
	};

	useEffect(() => {
		getProducts();
	}, [tableConfig]);

	return (
		<Crud.Root title={'Animals'} setRowSelected={setRowSelected}>
			{(mode === 'edit' || mode === 'create') && <></>}
			{mode === 'search' && (
				<>
					<Crud.SearchBar
						columns={colsPesquisa}
						setTableConfig={setTableConfig}
					></Crud.SearchBar>
					<Toolbar
						className="m-3"
						start={
							<Button
								label="cadastrar"
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
