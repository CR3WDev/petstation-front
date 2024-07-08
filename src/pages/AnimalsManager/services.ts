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
export const putUpdateAnimal = (id?: number) => {
	return useService().usePut('getTableAnimals', `/animal/${id}`);
};

export const putUpdateAnimalStatus = (id?: number, status?: string) => {
	return useService().usePut('getTableAnimals', `/animal/${id}/${status}`);
};

export const getCategoryDropdown = () => {
	return useService().useGet('getCategoryDropdown', `/category/dropdown`, true);
};
