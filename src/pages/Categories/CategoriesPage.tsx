import { Crud } from '@/components/Crud';
import { showToastSuccess } from '@/components/GlobalToast';
import { useDefaultTableConfig } from '@/hooks/useDefaultTableConfig';
import { ICategory } from '@/interfaces/category';
import { ITableConfig } from '@/interfaces/tableConfig';
import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesForm } from './components/CategoriesForm';
import { deleteCategory, getTableCategories } from './services';

export const CategoriesPage = () => {
	const mode = useSelector(selectorMode);
	const dispatch = useDispatch();
	const [rowSelected, setRowSelected] = useState<ICategory | undefined>();
	const [tableConfig, setTableConfig] = useState<ITableConfig>(
		useDefaultTableConfig('id')
	);
	const { refetch: getCategories, data } = getTableCategories(tableConfig);
	const { mutateAsync: removeCategory } = deleteCategory(rowSelected?.id);

	const cols = [{ field: 'name', header: 'Name' }];
	const colsSearch = [{ field: 'name', header: 'Name' }];

	const handleOnDelete = async (_row: any) => {
		await removeCategory().then(() => {
			showToastSuccess('Operation completed successfully!');
		});
	};

	useEffect(() => {
		getCategories();
	}, [tableConfig]);

	return (
		<Crud.Root title={'Categories'} setRowSelected={setRowSelected}>
			{(mode === 'edit' || mode === 'create') && (
				<CategoriesForm
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
