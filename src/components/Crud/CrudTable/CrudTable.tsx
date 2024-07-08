import { Column } from 'primereact/column';
import {
	DataTable,
	DataTablePageEvent,
	DataTableSortEvent,
} from 'primereact/datatable';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { IColumnType } from '@/interfaces/column';
import { IMode } from '@/interfaces/mode';
import { ITableConfig } from '@/interfaces/tableConfig';
import { CrudTableDefaultActions } from './CrudTableDefaultActions';

type CrudTableProps = {
	customActions?: (rowSelected: any) => ReactNode;
	data: any[];
	columns: IColumnType[];
	setRowSelected: Dispatch<SetStateAction<any>>;
	setTableConfig: Dispatch<SetStateAction<ITableConfig>>;
	tableConfig: ITableConfig;
	totalRecords: number;
	onDelete?: (rowSelected: any) => Promise<void>;
	actions?: IMode[];
};

export const CrudTable = ({
	data,
	columns,
	customActions,
	tableConfig,
	setRowSelected,
	setTableConfig,
	onDelete,
	actions,
	totalRecords,
}: CrudTableProps) => {
	const customColumns = (column: IColumnType) => {
		switch (column?.type) {
			case 'custom': {
				return (
					<Column
						key={column.field}
						field={column.field}
						className="p-2"
						sortable={!column.unsortable}
						header={column.header}
						bodyClassName="text-center"
						alignHeader={'center'}
						body={(e) => {
							return column.customColumn && column.customColumn(e);
						}}
					/>
				);
			}
			default: {
				return (
					<Column
						key={column.field}
						bodyClassName="text-center"
						field={column.field}
						header={column.header}
						alignHeader={'center'}
						sortable={!column.unsortable}
						className="p-2"
					/>
				);
			}
		}
	};

	const onPageChange = (event: DataTablePageEvent) => {
		setTableConfig((prev: any) => {
			return {
				...prev,
				rows: event.rows,
				page: event.page,
				pageCount: event.pageCount,
				first: event.first,
			};
		});
	};
	const onSortChange = (event: DataTableSortEvent) => {
		setTableConfig((prev: any) => {
			return {
				...prev,
				sortField: event.sortField,
				sortOrder: event.sortOrder,
				first: 0,
				page: 0,
				pageCount: 1,
			};
		});
	};

	return (
		<div className="m-3 pb-3">
			<div>
				<DataTable
					value={data}
					paginator
					rows={tableConfig?.rows}
					first={tableConfig?.first}
					totalRecords={totalRecords}
					lazy
					onSort={onSortChange}
					scrollable
					sortField={tableConfig?.sortField}
					emptyMessage={'No Values Stored!'}
					sortOrder={tableConfig?.sortOrder}
					onPage={onPageChange}
					rowsPerPageOptions={[5, 10, 20]}
					scrollHeight="500px"
				>
					{columns.map((col) => {
						return customColumns(col);
					})}
					<Column
						field="actions"
						header="Actions"
						className="p-2"
						headerClassName="flex justify-content-center text-center"
						body={(rowSelected) =>
							customActions ? (
								customActions(rowSelected)
							) : (
								<CrudTableDefaultActions
									actions={actions}
									onDelete={onDelete}
									rowSelected={rowSelected}
									setRowSelected={setRowSelected}
								/>
							)
						}
					/>
				</DataTable>
			</div>
		</div>
	);
};
