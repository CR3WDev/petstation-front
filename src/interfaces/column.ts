import { ReactNode } from 'react';

export interface IColumnType {
	field: string;
	header: string;
	type?: string;
	customColumn?: (e: any) => ReactNode;
	unsortable?: boolean;
}
