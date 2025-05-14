import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Menu, X, Sparkles, Zap, Shield, BarChart } from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      title: 'AI-Powered Insights',
      description: 'Get real-time insights and predictions powered by advanced AI algorithms'
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance with our optimized platform'
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-600" />,
      title: 'Enterprise Security',
      description: 'Bank-grade security to keep your data safe and compliant'
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-600" />,
      title: 'Advanced Analytics',
      description: 'Deep insights into your business performance and trends'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Sparkles className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SalesAssist</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
              <Link to="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Let's Talk</Link>
              <Link
                to="/auth"
                className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/products" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">Products</Link>
              <Link to="/solutions" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">Solutions</Link>
              <Link to="/resources" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">Resources</Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-700">Let's Talk</Link>
              <Link to="/auth" className="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md">Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Sales</span>
            <span className="block text-primary-600">With AI-Powered Insights</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Boost your sales performance with real-time insights, predictive analytics, and automated workflows powered by advanced AI.
          </p>
          <div className="mt-10">
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg"
            >
              Show Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features for Modern Sales Teams
            </h2>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to transform your sales process?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Get started with SalesAssist today and see the difference AI can make.
            </p>
            <form onSubmit={handleGetStarted} className="mt-8 sm:flex justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full sm:max-w-xs px-5 py-3 border border-transparent rounded-md text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-700 focus:ring-white"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;