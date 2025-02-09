import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BLOCKNOTES_FEATURE_KEY, blocknotesReducer } from '@org/blocknote';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: { [BLOCKNOTES_FEATURE_KEY]: blocknotesReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});


root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
