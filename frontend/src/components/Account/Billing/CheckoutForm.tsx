/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { useUserData } from "../../../context/UserDataContext";
import { useApiClient } from "../../../lib/axios";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast } from "../../../utils/react-toast";
import {
  SubscriptionCard,
  subscriptionCards,
} from "../../../utils/subscriptionCards";
import PaymentSuccessModal from "./PaymentSuccessModal";

interface CheckoutFormProps {
  clientSecret: string;
  priceId: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  priceId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const apiClient = useApiClient();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  const selectedPlan: SubscriptionCard | undefined = useMemo(
    () => subscriptionCards.find((plan) => plan.priceId === priceId),
    [priceId],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        // confirmParams: {
        //   return_url: `${window.location.origin}/billing/success`,
        // },
        redirect: "if_required",
      });

      if (error) {
        errorToast(error.message || "Payment failed");
        return;
      }
      await apiClient.post<{
        success: boolean;
        message: string;
        data: { clientSecret: string };
      }>("/stripe/confirm", {
        businessId: userData?.businessId,
        setupIntentId: setupIntent.id,
        priceId,
      });
      setSuccessModal(true);
    } catch (err: any) {
      errorToast(
        err.response?.data?.error || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PaymentSuccessModal open={successModal} />
      <div className="mx-auto rounded-3xl bg-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {/* ================= LEFT: PLAN DETAILS ================= */}
          <div
            className="rounded-3xl p-8 text-white"
            style={{
              background: colorTheme.secondaryColor(0.9),
            }}
          >
            <h2 className="text-3xl font-bold">Your Plan</h2>
            <p className="mt-1 text-sm opacity-80">
              Review your subscription details
            </p>

            {selectedPlan && (
              <div className="mt-6 rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                  <span className="text-2xl font-bold">
                    {selectedPlan.price}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-green-300">✔</span>
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/20 pt-4 text-xs opacity-75">
                  Billed monthly • Cancel anytime
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT: PAYMENT ================= */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Payment Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Secure checkout powered by Stripe
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {clientSecret ? (
                <PaymentElement />
              ) : (
                <div className="rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-500">
                  Initializing secure payment…
                </div>
              )}

              <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:opacity-50"
                style={{
                  background: colorTheme.secondaryColor(0.9),
                }}
              >
                {loading
                  ? "Processing payment…"
                  : `Pay ${selectedPlan?.price ?? ""}`}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-400">
              🔒 Payments are encrypted and PCI-compliant
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
