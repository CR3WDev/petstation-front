import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Interceptor } from './api/components/interceptor.tsx';
import { queryClient } from './api/queryClient.ts';
import App from './App.tsx';
import { GlobalToast } from './components/GlobalToast.tsx';
import './index.css';
import { store } from './redux/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Interceptor>
					<App />
				</Interceptor>
			</QueryClientProvider>
		</Provider>
		<GlobalToast />
	</React.StrictMode>
);
