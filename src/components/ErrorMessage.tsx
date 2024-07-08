import { ReactElement } from 'react';

type ErrorMessageProps = {
	/** errors do react-hook-forms */
	errors: any;
};
export const ErrorMessage = ({
	errors,
}: ErrorMessageProps): ReactElement | undefined => {
	if (!errors) return;
	if (errors?.type === 'required') {
		return <span className="p-error">{'Required field not filled'}</span>;
	}
	if (errors.type === 'validate') {
		return <span className="p-error">{errors.message}</span>;
	}
};
