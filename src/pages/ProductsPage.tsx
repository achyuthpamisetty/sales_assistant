import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart, Users, Shield, Zap, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'sales-ai',
    icon: <Sparkles className="h-8 w-8" />,
    name: 'Sales AI',
    description: 'AI-powered sales insights and predictions',
    features: ['Lead scoring', 'Deal predictions', 'Smart notifications'],
    price: '$99/month'
  },
  {
    id: 'analytics',
    icon: <BarChart className="h-8 w-8" />,
    name: 'Analytics Suite',
    description: 'Comprehensive sales analytics and reporting',
    features: ['Custom dashboards', 'Advanced reporting', 'Data visualization'],
    price: '$149/month'
  },
  {
    id: 'crm',
    icon: <Users className="h-8 w-8" />,
    name: 'CRM Platform',
    description: 'Complete customer relationship management',
    features: ['Contact management', 'Pipeline tracking', 'Email integration'],
    price: '$199/month'
  },
  {
    id: 'enterprise',
    icon: <Shield className="h-8 w-8" />,
    name: 'Enterprise Suite',
    description: 'Full-featured enterprise solution',
    features: ['All features included', 'Priority support', 'Custom integration'],
    price: 'Custom pricing'
  }
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Products
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Choose the perfect solution for your business needs
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  {product.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-2 text-gray-500">{product.description}</p>
                <div className="mt-4">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                </div>
                <ul className="mt-6 space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Zap className="h-5 w-5 text-primary-500" />
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-8 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;