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

export const putUpdateAnimalStatus = (id?: number, status?: string) => {
	return useService().usePut('getTableAnimals', `/animal/${id}/${status}`);
};

export const getCategoryDropdown = () => {
	return useService().useGet('getCategoryDropdown', `/category/dropdown`, true);
};

export const postUploadImage = () => {
	return useService().usePostFormData('postUploadImage', `/image`);
};
export const getImageById = (imageId?: number, enabled?: boolean) => {
	return useService().useGet('postUploadImage', `/image/${imageId}`, !!enabled);
};
