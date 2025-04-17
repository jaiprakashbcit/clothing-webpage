import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(stripePublishableKey);

export const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1234,
};
