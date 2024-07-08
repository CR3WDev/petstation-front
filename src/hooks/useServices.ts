import { useMutation, useQuery } from '@tanstack/react-query';

import { api, apiFormData } from '@/api/axios';
import { queryClient } from '@/api/queryClient';
import { ITableConfig } from '@/interfaces/tableConfig';

export const useService = () => {
	const useGet = (key: string, path: string, enabled: boolean) => {
		return useQuery({
			queryKey: [key],
			queryFn: () => {
				return api.get(path);
			},

			enabled: enabled || false,
		});
	};

	const usePost = <T>(key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: (data: T | any) => {
				return api.post<T | any>(path, data);
			},
		});
	};

	const usePostFormData = <T>(key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: (data: T | any) => {
				return apiFormData.post<T | any>(path, data);
			},
		});
	};

	const useDelete = (key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: () => {
				return api.delete(path);
			},
		});
	};
	const useGetTable = <_T>(
		key: string,
		path: string,
		tableConfig: ITableConfig
	) => {
		return useQuery({
			queryKey: [key],
			queryFn: () => {
				return api.post(path, tableConfig);
			},
		});
	};
	const usePut = <T>(key: string, path: string) => {
		return useMutation({
			mutationKey: [key],
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [key],
				});
			},
			mutationFn: (data: T | any) => {
				return api.put(path, data);
			},
		});
	};

	return {
		usePost,
		useDelete,
		usePostFormData,
		useGetTable,
		usePut,
		useGet,
	};
};
