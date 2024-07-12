import { useService } from '@/hooks/useServices';
import { ITableConfig } from '@/interfaces/tableConfig';

export const getTableCategories = (tableConfig: ITableConfig) => {
	return useService().useGetTable(
		'getTableCategories',
		'/category/list',
		tableConfig
	);
};
export const postNewCategory = () => {
	return useService().usePost('getTableCategories', '/category');
};
export const deleteCategory = (id?: number) => {
	return useService().useDelete('getTableCategories', `/category/${id}`);
};
export const putUpdateCategory = () => {
	return useService().usePut('getTableCategories', `/category`);
};
