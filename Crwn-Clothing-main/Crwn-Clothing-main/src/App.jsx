import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from './store/user/user.slice';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utility';

import NavigationBar from './routes/navigation-bar/navigation-bar.route';
import Home from './routes/home/home.route';
import Authentication from './routes/authentication/authentication.route';
import Shop from './routes/shop/shop.route';
import Checkout from './routes/checkout/checkout.route';
import AddressAndPaymentForm from './routes/address-and-payment-form/address-and-payment-form.route';
import PaymentSuccessful from './routes/payment-successful/payment-successful.route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // create user doc if user signs in with google.
        // This creates a separate document for the user in the Firestore Database. This document can contain any key-value pair we choose to include.
        createUserDocumentFromAuth();
      }
      // The users displayName and email come from the user's auth instance and ***NOT*** the user document.
      const selectedUserDetails = user && (({ displayName, email }) => ({ displayName, email }))(user);
      dispatch(setCurrentUser(selectedUserDetails));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<NavigationBar />}>
          <Route
            index={true}
            element={<Home />}
          />
          <Route
            path="shop/*"
            element={<Shop />}
          />
          <Route
            path="auth"
            element={<Authentication />}
          />
          <Route
            path="checkout"
            element={<Checkout />}
          />
          <Route
            path="payment"
            element={<AddressAndPaymentForm />}
          />
          <Route
            path="payment-successful"
            element={<PaymentSuccessful />}
          />
        </Route>
      </Routes>
      <div style={{ height: '50px', backgroundColor: 'transparent' }}></div>
    </div>
  );
}

export default App;
