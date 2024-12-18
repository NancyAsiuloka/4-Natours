import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { showAlert } from './alert';

const stripePromise = loadStripe(
  'pk_test_51QUAXeAcPH5FkzkovQjueqTwBIisrak88FJVS5XO9O8JTvtGJ2qZPjdF78gJDBgVfT2tOg1GxKqGgwWG30Kqufq2001ZfII7mN',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios.get(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
