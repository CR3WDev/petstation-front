import { selectorMode, setMode } from '@/redux/Reducers/modeReducer';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type CrudRootProps = {
	children: ReactNode;
	title: string;
	setRowSelected: Dispatch<SetStateAction<any>>;
};
export const CrudRoot = ({
	children,
	title,
	setRowSelected,
}: CrudRootProps) => {
	const dispatch = useDispatch();
	const mode = useSelector(selectorMode);

	useEffect(() => {
		return () => {
			dispatch(setMode('search'));
		};
	}, []);

	useEffect(() => {
		if (mode === 'search') setRowSelected(undefined);
	}, [mode]);

	return (
		<div className="page-container flex flex-column">
			<ConfirmDialog draggable={false} />
			<h2 className="mx-3 mt-3 m-0">{title}</h2>
			{children}
		</div>
	);
};
