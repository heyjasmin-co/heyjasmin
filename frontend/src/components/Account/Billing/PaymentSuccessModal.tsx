import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { colorTheme } from "../../../theme/colorTheme";

interface PaymentSuccessModalProps {
  open: boolean;
  onClose?: () => void;
}

export default function PaymentSuccessModal({
  open,
}: PaymentSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="mb-4 flex justify-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>

        {/* Text */}
        <h2 className="mb-1 text-xl font-semibold text-gray-900">
          Payment Successful 🎉
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Your subscription has been activated successfully.
        </p>

        {/* Continue Button */}
        <button
          onClick={() =>
            (window.location.href = "/admin/dashboard/account/billing")
          }
          className="0 w-full rounded-lg py-2.5 text-sm font-medium text-white transition active:scale-95"
          style={{
            backgroundColor: colorTheme.secondaryColor(0.9),
          }}
        >
          Continue
        </button>
      </motion.div>
    </div>
  );
}
