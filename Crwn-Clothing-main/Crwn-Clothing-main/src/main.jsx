import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import { store, persistor } from './store/store';

import { stripePromise, options } from './utils/stripe/stripe.utility';

import App from './App';

import './main.scss';
import ScrollToTop from './helpers/scroll-to-top/scroll-to-top.helper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <Elements
            stripe={stripePromise}
            options={options}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
