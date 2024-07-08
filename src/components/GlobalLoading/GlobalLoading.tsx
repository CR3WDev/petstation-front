import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { ProgressSpinner } from 'primereact/progressspinner';
import './GlobalLoadingStyle.scss';

export const GlobalLoading = () => {
	const excludedQueryKeys: string[] = [''];
	const excludedMutationsKeys: string[] = [''];

	const removeSomeKeys = (excludedKeys: string[], key: string) => {
		if (excludedKeys.includes(`${key}`) || key.includes('DataTable'))
			return false;
		return true;
	};

	let sum =
		useIsFetching({
			predicate: (key: any) => {
				return removeSomeKeys(excludedQueryKeys, `${key?.queryKey[0]}`);
			},
		}) +
		useIsMutating({
			predicate: (key: any) => {
				return removeSomeKeys(
					excludedMutationsKeys,
					`${key?.options.mutationKey[0]}`
				);
			},
		});

	const isLoading = sum;

	return (
		<div
			style={{ zIndex: 9999999999999999 }}
			className={`globalLoading ${
				!isLoading ? 'hidden' : 'flex justify-content-center align-items-center'
			} `}
		>
			<div className="flex justify-content-center align-content-center p-2 ">
				<ProgressSpinner />
			</div>
		</div>
	);
};
