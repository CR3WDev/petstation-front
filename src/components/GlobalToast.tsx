import { Toast, ToastProps } from 'primereact/toast';
import { useEffect, useRef } from 'react';

let getToastRef: ToastProps | any;
const TOAST_EXPIRATION = 10000;
const GlobalToast = () => {
	const toast = useRef<ToastProps | any>();

	useEffect(() => {
		getToastRef = toast;
	}, []);

	return <Toast ref={toast} position="top-right" />;
};
const showToastError = (message: string, title?: string) => {
	if (getToastRef.current)
		getToastRef.current.show({
			severity: 'error',
			life: TOAST_EXPIRATION,
			summary: title || 'Error',
			detail: message,
		});
};
const showToastSuccess = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'success',
			life: TOAST_EXPIRATION,
			summary: title || 'Success',
			detail: message,
		});
};

const showToastWarn = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'warn',
			life: TOAST_EXPIRATION,
			summary: title || 'Warning',
			detail: message,
		});
};
const showToastInfo = (message: string, title?: string) => {
	if (getToastRef)
		getToastRef.current.show({
			severity: 'info',
			life: TOAST_EXPIRATION,
			summary: title || 'Info',
			detail: message,
		});
};
export {
	getToastRef,
	GlobalToast,
	showToastError,
	showToastInfo,
	showToastSuccess,
	showToastWarn,
};
