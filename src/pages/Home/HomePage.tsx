import { Topbar } from '@/components/Topbar';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
	return (
		<div>
			<Topbar />
			<Outlet />
		</div>
	);
};
