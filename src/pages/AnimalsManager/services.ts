import { useService } from '@/hooks/useServices';
import { ITableConfig } from '@/interfaces/tableConfig';

export const getTableAnimals = (tableConfig: ITableConfig) => {
	return useService().useGetTable(
		'getTableAnimals',
		'/animal/list',
		tableConfig
	);
};
export const postNewAnimal = () => {
	return useService().usePost('getTableAnimals', '/animal');
};
export const deleteAnimal = (id?: number) => {
	return useService().useDelete('getTableAnimals', `/animal/${id}`);
};
export const putUpdateAnimal = () => {
	return useService().usePut('getTableAnimals', `/animal`);
};
