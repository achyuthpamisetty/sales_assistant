import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Headphones, Mail, Lock, User, Building } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isLogin && formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let result;
      try {
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      if (isLogin) {
        if (!result.user?.isVerified) {
          alert('Please verify your email before logging in.');
          setLoading(false);
          return;
        }

        localStorage.setItem('token', result.token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Registration successful! Please check your email to verify your account.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center">
            <Headphones className="h-12 w-12 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-primary-900">SalesAssist</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <InputField
                  label="Full Name"
                  id="name"
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
                <InputField
                  label="Company Name"
                  id="company"
                  icon={<Building className="h-5 w-5 text-gray-400" />}
                  value={formData.company}
                  name="company"
                  onChange={handleInputChange}
                  placeholder="Acme Inc"
                  required
                />
              </>
            )}

            <InputField
              label="Email address"
              id="email"
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              type="email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />

            <InputField
              label="Password"
              id="password"
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              type="password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              placeholder="••••••••"
              required
            />

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isLogin ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  id: string;
  icon: React.ReactNode;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  icon,
  value,
  name,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default AuthPage;
