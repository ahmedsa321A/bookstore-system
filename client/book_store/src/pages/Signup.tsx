import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, UserPlus } from "lucide-react";
import type { SignupErrors } from "../data/signup";
import { validateSignup } from "../utils/helper";
import AlertCard from "../components/AlertCard";
import FormInput from "../components/Forminput";
export function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    shippingAddress: "",
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title?: string;
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: SignupErrors = {};
    validateSignup({ ...formData, errors: newErrors });

    // ✅ FIXED: check newErrors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        variant: "error",
        title: "Form Error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    console.log("Form Data Submitted:", formData);

    setAlert({
      variant: "success",
      title: "Account Created",
      message: "Your account has been created successfully ",
    });

    setTimeout(() => {
      navigate("/customer");
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
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
                id="firstName"
                name="firstName"
                value={formData.firstName}
                placeholder="Enter your first name"
                error={errors.firstName}
                onChange={handleChange}
              />

              <FormInput
                label="Last Name"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                placeholder="Enter your last name"
                error={errors.lastName}
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
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              placeholder="123 Main Street, City, State, ZIP"
              rows={3}
              error={errors.shippingAddress}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="h-5 w-5" />
              Sign Up
            </button>
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
