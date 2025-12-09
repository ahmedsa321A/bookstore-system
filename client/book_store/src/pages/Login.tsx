import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogIn } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - check username to determine role
    if (username === 'admin' || username === 'admin@bookstore.com') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/search');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-primary text-white p-3 rounded-full">
                <BookOpen className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-primary mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="h-5 w-5" />
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Create Account
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-center text-muted-foreground mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-sm">
              <div className="bg-secondary/30 p-3 rounded">
                <p className="text-primary">Admin Account</p>
                <p>Username: admin</p>
                <p>Password: admin123</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded">
                <p className="text-primary">Customer Account</p>
                <p>Username: john.smith</p>
                <p>Password: customer123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
