import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { payment } from  "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/card/CheckoutForm";

const stripePromise = loadStripe("pk_test_51PfyhyDfJ8cMV0HJrkvdhwsz0vVZf20CtAOghfuwNmPU7wamAVQAmVWXup5dIYp0wLjYCACiZ6PsKcwbAc1yiEsH00HJ9kkIbc");

const Payment = () => {
  const token = useEcomStore((state) => state.token);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
    .then((res) => {
      setClientSecret(res.data.clientSecret);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';


  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment