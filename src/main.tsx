import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import './index.css';
import { persistor, store } from './redux/store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<Box height={'100vh'}>
						<App />
					</Box>
				</PersistGate>
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
