import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../utils/utils";
function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;  //using optional chaining to avoid crashing incase token is not there!!!

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchBuyCourseData = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/course/buy/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true, // Include cookies if needed
          }
        );
        console.log(response.data);
        setCourse(response.data.course);
        setClientSecret(response.data.clientSecret);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.status === 400) {
          setError("you have already purchased this course");
          navigate("/purchases");
        } else {
          setError(error?.response?.data?.errors);
        }
      }
    };
    fetchBuyCourseData();
  }, [courseId]);

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe or Element not found");
      return;
    }

    setLoading(true);
    const card = elements.getElement(CardElement);

    if (card == null) {
      console.log("Cardelement not found");
      setLoading(false);
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Stripe PaymentMethod Error: ", error);
      setLoading(false);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod Created]", paymentMethod);
    }
    if (!clientSecret) {
      console.log("No client secret found");
      setLoading(false);
      return;
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.user?.firstName,
            email: user?.user?.email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded: ", paymentIntent);
      setCardError("your payment id: ", paymentIntent.id);
      const paymentInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        courseId: courseId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };
      console.log("Payment info: ", paymentInfo);
      await axios
        .post(`${BACKEND_URL}/order`, paymentInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error in making payment");
        });
      toast.success("Payment Successful");
      navigate("/purchases");
    }
    setLoading(false);
  };
  return (
    <>
    {error ? (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-lg font-semibold">{error}</p>
          <Link
            to="/purchases"
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md inline-flex items-center justify-center transition duration-300 w-full"
          >
            Go to Purchases
          </Link>
        </div>
      </div>
    ) : (
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 my-24 container mx-auto px-4">
        {/* Left Side: Order Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-xl font-semibold underline mb-6">
            Order Details
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-gray-600 text-sm">Total Price:</h2>
              <p className="text-red-500 font-bold text-lg">₹{course.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-gray-600 text-sm">Course Name:</h2>
              <p className="text-red-500 font-bold text-lg">{course.title}</p>
            </div>
          </div>
        </div>
  
        {/* Right Side: Payment Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Process your Payment!
            </h2>
  
            <form onSubmit={handlePurchase}>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="card-number"
              >
                Credit / Debit Card
              </label>
  
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
                className="p-2 border border-gray-300 rounded-md bg-gray-50"
              />
  
              <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300"
              >
                {loading ? "Processing..." : "Pay"}
              </button>
  
              {cardError && (
                <p className="text-red-500 font-semibold text-sm mt-2">
                  {cardError}
                </p>
              )}
            </form>
  
            <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-300 flex items-center justify-center">
              <span className="mr-2">🅿️</span> Other Payment Methods
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  
  );
}

export default Buy;
