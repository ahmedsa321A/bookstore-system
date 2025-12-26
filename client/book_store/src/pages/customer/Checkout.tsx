import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCart } from '../../store/slices/cartSlice';
import FormInput from '../../components/FormInput';
import AlertCard from '../../components/AlertCard';
import type { CheckoutRequest } from '../../api/orderService';
import orderService from '../../api/orderService';

export function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
  });
  const [errors, setErrors] = useState<{ cardNumber?: string; expiryDate?: string }>({});
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title?: string;
    message: string;
  } | null>(null);

  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: { cardNumber?: string} = {};
    let isValid = true;

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Credit Card Number is required';
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Credit Card Number must be 16 digits';
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) {
      setAlert({
        variant: "error",
        title: "Validation Error",
        message: "Please check your payment details.",
      });
      return;
    }
    const orderRequest: CheckoutRequest = {
      cardNumber: formData.cardNumber,
      cartItems: cartItems.map((item) => ({
        isbn: item.isbn,
        quantity: item.quantity,
      })),
    };
    try {
      const response = await orderService.checkout(orderRequest);
      console.log(response);
      setAlert({
        variant: "success",
        title: "Payment Successful",
        message: "Your payment has been processed successfully!",
      });
      dispatch(clearCart());

    } catch (error) {
      console.error("Error placing order:", error);
      setAlert({
        variant: "error",
        title: "Payment Error",
        message: "Failed to process payment. Please try again.",
      });
      return;
    }
 
  };

  if (cartItems.length === 0) {
    navigate('/customer/cart');
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase</p>
      </div>

      {alert && (
        <div className="mb-6">
          <AlertCard
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2>Payment Information</h2>
              </div>
              <div className="space-y-4">
                <FormInput
                  label="Credit Card Number"
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  value={formData.cardNumber}
                  error={errors.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                />

              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.isbn} className="flex gap-3 pb-3 border-b border-border">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm mb-1 line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm text-primary mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-3 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="h-5 w-5" />
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
