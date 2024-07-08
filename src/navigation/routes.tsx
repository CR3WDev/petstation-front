import { createBrowserRouter } from 'react-router-dom';

import { AnimalsManagerPage } from '@/pages/AnimalsManager/AnimalsManagerPage';
import { CategoriesPage } from '@/pages/Categories/CategoriesPage';
import { HomePage } from '@/pages/Home/HomePage';
import { IntroductionPage } from '@/pages/Introduction/IntroductionPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
		children: [
			{
				path: '',
				element: <IntroductionPage />,
			},
			{
				path: 'animals',
				element: <AnimalsManagerPage />,
			},
			{
				path: 'categories',
				element: <CategoriesPage />,
			},
		],
	},
]);
