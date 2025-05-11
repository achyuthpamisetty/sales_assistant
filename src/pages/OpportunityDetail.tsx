import React from 'react';
import { useParams } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectDetail from '../components/objects/ObjectDetail';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { opportunities, accounts, loading, getObjectById } = useSalesforce();

  const opportunity = id ? getObjectById('opportunities', id) : null;
  const account = opportunity?.accountId
    ? getObjectById('accounts', opportunity.accountId)
    : null;

  const products = opportunity?.products || [
    { name: 'Product A', quantity: 2, price: 100 },
    { name: 'Product B', quantity: 1, price: 250 },
  ];

  return (
    <div className="space-y-8">
      <ObjectDetail
        type="opportunity"
        data={opportunity}
        backPath="/opportunities"
        title="Opportunities"
        isLoading={loading}
        showExport={false} // <-- Disable export option (adjust based on actual prop)
      />

      {account && (
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Account Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div><strong>Name:</strong> {account.name}</div>
            <div><strong>Industry:</strong> {account.industry}</div>
            <div><strong>Phone:</strong> {account.phone}</div>
            <div><strong>Website:</strong> 
              <a href={account.website} className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">
                {account.website}
              </a>
            </div>
            <div><strong>Type:</strong> {account.type}</div>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-slate-700 border rounded-md">
            <thead className="bg-slate-100 text-slate-600 font-medium">
              <tr>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, idx: number) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">${product.price * product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
