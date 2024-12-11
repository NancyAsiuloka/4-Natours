import axios from 'axios';
const stripe = Stripe(
  'pk_test_51QUAXeAcPH5FkzkovQjueqTwBIisrak88FJVS5XO9O8JTvtGJ2qZPjdF78gJDBgVfT2tOg1GxKqGgwWG30Kqufq2001ZfII7mN',
);

export const bookTour = async (tourId) => {
  // 1) Get checkout session from API
  const session = await axios(
    `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
  );
  console.log(session)

  // 2) Create checkout form + charge credit card
};
