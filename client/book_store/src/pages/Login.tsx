import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogIn } from "lucide-react";
import FormInput from "../components/Forminput";
import AlertCard from "../components/AlertCard";

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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      return;
    }

    // Mock login - check username to determine role
    if (formData.username === "admin" || formData.username === "admin@bookstore.com") {
      setAlert({ variant: "success", message: "Logged in as admin" });
      setTimeout(() => navigate("/admin"), 1000);
    } else {
      setAlert({ variant: "success", message: "Logged in as customer" });
      setTimeout(() => navigate("/customer"), 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
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

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 cursor-pointer!"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
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
