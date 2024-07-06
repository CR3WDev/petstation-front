import { Button } from 'primereact/button';
import { MdAdd } from 'react-icons/md';

type CrudButtonProps = {
	onCreate: () => void;
};

export const CrudButton = ({ onCreate }: CrudButtonProps) => {
	return (
		<Button onClick={onCreate}>
			Register <MdAdd className="ml-2" />
		</Button>
	);
};
