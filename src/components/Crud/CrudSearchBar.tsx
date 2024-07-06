import { useDefaultTableConfig } from '@/hooks/useDefaultTableConfig';
import { IColumnType } from '@/interfaces/column';
import { ITableConfig, ITableConfigFilters } from '@/interfaces/tableConfig';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dispatch, SetStateAction, useState } from 'react';

type CrudSearchBarProps = {
	buttonOnClick?: () => void;
	columns: IColumnType[];
	useDropdown?: boolean;
	setTableConfig: Dispatch<SetStateAction<ITableConfig>>;
};

export const CrudSearchBar = ({
	columns,
	setTableConfig,
}: CrudSearchBarProps) => {
	const [searchValues, setSearchValues] = useState<{ [key: string]: string }>(
		{}
	);

	const handleSearchInputChange = (field: string, value: string) => {
		setSearchValues({ ...searchValues, [field]: value });
	};

	const handleSearch = () => {
		let filters: ITableConfigFilters[] = [];
		Object.entries(searchValues).map(([key, value]) => {
			filters.push({ field: key, op: 'MATCH', value });
		});
		if (filters.length === 0) return;
		setTableConfig((prev) => {
			return { ...prev, filters };
		});
	};
	const handleClearSearch = () => {
		setSearchValues({});
		setTableConfig(useDefaultTableConfig(columns[0].field));
	};
	const renderSearchFields = (column: IColumnType, index: number) => {
		switch (column.type) {
			default: {
				return (
					<div className={index !== 0 ? 'ml-2' : ''}>
						<InputText
							placeholder={`${column.header}`}
							value={searchValues[column.field] || ''}
							onChange={(e) =>
								handleSearchInputChange(column.field, e.target.value)
							}
						/>
					</div>
				);
			}
		}
	};

	return (
		<div className="m-3 custom-card">
			<div>
				<h3 className="m-0 mb-3">Search</h3>
			</div>
			<div className="flex p-0">
				{columns.map((column, index) => {
					return renderSearchFields(column, index);
				})}
				<div className="ml-3">
					<Button onClick={handleSearch}>Search</Button>
					<Button text className="ml-2" onClick={handleClearSearch}>
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
};
