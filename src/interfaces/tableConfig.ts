export interface ITableConfig {
	filters: ITableConfigFilters[];
	sortField: string;
	sortOrder: 0 | 1 | -1 | null | undefined;
	page?: number;
	pageCount?: number;
	first: number;
	rows: number;
}
export interface ITableConfigFilters {
	field: string;
	op: 'MATCH';
	value: string;
}
