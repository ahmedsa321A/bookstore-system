import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn } from "lucide-react";
import FormInput from "../components/FormInput";
import AlertCard from "../components/AlertCard";
import { CustomButton } from "../components/CustomButton";
import authService from "../api/authService";
import type { User } from "../types/auth";
import { setUser } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type LoginForm = {
  username: string;
  password: string;
};

type LoginErrors = Partial<LoginForm>;

export function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    variant: "success" | "error";
    title?: string;
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAppSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (user) {
      if (user.Role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    }
  } , [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: LoginErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        variant: "error",
        title: "Form Error",
        message: "Please fix the highlighted fields and try again.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const user : User = await authService.login(formData);
      dispatch(setUser(user));
      setIsSubmitting(false);      
      setAlert({
        variant: "success",
        title: "Login Successful",
        message: `Welcome back, ${user.FirstName}!`,
      });
      if (user.Role === "admin") {
        setTimeout(() => {
          navigate("/admin/dashboard");

        }, 1500);
      }
      else {
        setTimeout(() => {
          navigate("/customer");
        }, 1500);
      }
    }
    catch (error: any) {
      setIsSubmitting(false);
      console.error("Login error:", error);
      setAlert({
        variant: "error",
        title: "Login Failed",
        message: error.response?.data ||"An error occurred during login. Please try again.",
      });
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-primary hover:underline">
          &larr; Back to Home
        </Link> 
      </div>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white p-3 rounded-full">
                <BookOpen className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-primary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
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

            <CustomButton
              type="submit"
              icon={LogIn}
              isLoading={isSubmitting}
            >
              Login
            </CustomButton>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
