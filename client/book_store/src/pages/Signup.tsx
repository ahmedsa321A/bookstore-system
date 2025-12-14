import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, UserPlus } from "lucide-react";
import type { SignupErrors } from "../types/signup";
import { validateSignup } from "../utils/helper";
import AlertCard from "../components/AlertCard";
import FormInput from "../components/FormInput";
import type { SignupRequest } from "../types/auth";
import { CustomButton } from "../components/CustomButton";
import authService from "../api/authService";

export function Signup() {
  const [formData, setFormData] = useState<SignupRequest>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Ensure your SignupErrors type allows string indexing for the clear logic to work
  const [errors, setErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title?: string;
    message: string;
  } | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null); // Clear previous alerts
    setIsSubmitting(true); // START LOADING

    // 1. Validate
    const newErrors: SignupErrors = {};
    validateSignup({ ...formData, errors: newErrors });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        variant: "error",
        title: "Form Error",
        message: "Please fix the highlighted fields and try again.",
      });
      setIsSubmitting(false); // STOP LOADING if validation fails
      return;
    }

    // 2. Submit
    try {
      const message = await authService.signup(formData);
      if (message) {
        setAlert({
          variant: "success",
          title: "Account Created",
          message: "Your account has been created successfully. Redirecting...",
        });
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error: any) {
      // Error Handling
      setIsSubmitting(false); // STOP LOADING on error
      console.error("Signup error:", error);
      setAlert({
        variant: "error",
        title: "Signup Failed",
        message:
          error.response?.data?.message || 
          error.response?.data ||
          "An error occurred during signup. Please try again.",
      });
    }
    // Note: We do NOT put setIsSubmitting(false) in 'finally' 
    // because we want the spinner to keep going if we are redirecting on success.
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // FIXED: Clear the specific error for this field immediately
    if (errors[name as keyof SignupErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white p-3 rounded-full">
                <BookOpen className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-primary mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Join our bookstore community today
            </p>
          </div>

          {/* Alert */}
          {alert && (
            <AlertCard
              variant={alert.variant}
              title={alert.title}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                placeholder="Enter your first name"
                error={errors.first_name} /* FIXED: Matches name="first_name" */
                onChange={handleChange}
              />

              <FormInput
                label="Last Name"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                placeholder="Enter your last name"
                error={errors.last_name} /* FIXED: Matches name="last_name" */
                onChange={handleChange}
              />
            </div>

            <FormInput
              label="Username"
              id="username"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              error={errors.username}
              onChange={handleChange}
            />

            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="Enter your email"
              error={errors.email}
              onChange={handleChange}
            />

            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="••••••••"
              error={errors.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onChange={handleChange}
            />

            <FormInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              placeholder="+2 123 123-4567"
              error={errors.phone}
              onChange={handleChange}
            />

            <FormInput
              label="Shipping Address"
              id="address"
              name="address"
              value={formData.address}
              placeholder="123 Main Street, City, State, ZIP"
              rows={3}
              error={errors.address} /* FIXED: Matches name="address" */
              onChange={handleChange}
            />

            <CustomButton
              type="submit"
              icon={UserPlus}
              isLoading={isSubmitting}
              disabled={isSubmitting} // Ensure button is disabled while loading
            >
              Create Account
            </CustomButton>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline ">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}