import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectDetail from '../components/objects/ObjectDetail';

const AccountDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { accounts, loading, getObjectById } = useSalesforce();

  const account = id ? getObjectById('accounts', id) : null;

  const [insights, setInsights] = useState({
    gong: '',
    linkedin: '',
    zoominfo: '',
  });

  const [accountScore, setAccountScore] = useState<number>(0);
  const [insightsLoading, setInsightsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const salesforceBaseUrl = "https://yourInstance.salesforce.com"; // Replace with actual instance
  const salesforceUrl = account ? `${salesforceBaseUrl}/${account.id}` : null;

  useEffect(() => {
    if (account) {
      setInsightsLoading(true);
      const fetchInsights = async () => {
        try {
          const gongInsight = `Multiple stakeholders from ${account.name} discussed implementation timelines in the last QBR.`;
          const linkedinInsight = `${account.name} recently posted a job opening for a Revenue Operations Manager.`;
          const zoominfoInsight = `${account.name} expanded headcount by 25% in the last quarter.`;

          setInsights({
            gong: gongInsight,
            linkedin: linkedinInsight,
            zoominfo: zoominfoInsight,
          });

          let score = 0;
          if (gongInsight) score += 30;
          if (linkedinInsight) score += 20;
          if (zoominfoInsight) score += 25;
          if (account.employees && account.employees > 1000) score += 25;

          setAccountScore(score);
        } catch (err) {
          setError('Failed to load insights.');
        } finally {
          setInsightsLoading(false);
        }
      };

      fetchInsights();
    }
  }, [account]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <ObjectDetail
          type="account"
          data={account}
          backPath="/accounts"
          title={
            <div className="flex items-center space-x-2">
              <span>{account?.name}</span>
              {salesforceUrl && (
                <a
                  href={salesforceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View in Salesforce"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg"
                    alt="Salesforce"
                    className="w-4 h-4"
                  />
                </a>
              )}
            </div>
          }
          isLoading={loading}
        />

        {account && (
          <div className="border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Account Score</h3>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                <strong>Score: </strong>{accountScore} / 100
              </p>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${accountScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {account && (
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="rounded-xl border p-6 shadow-sm bg-white space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Insights</h2>

            {error && <p className="text-red-600">{error}</p>}

            {insightsLoading ? (
              <div className="text-center text-slate-500">Loading insights...</div>
            ) : (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-medium text-slate-700 mb-1">🔊 Gong</h3>
                  <p className="text-sm text-slate-600">{insights.gong}</p>
                </div>
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-medium text-slate-700 mb-1">💼 LinkedIn</h3>
                  <p className="text-sm text-slate-600">{insights.linkedin}</p>
                </div>
                <div className="border rounded-lg p-4 bg-slate-50">
                  <h3 className="font-medium text-slate-700 mb-1">📊 ZoomInfo</h3>
                  <p className="text-sm text-slate-600">{insights.zoominfo}</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border p-6 shadow-sm bg-white space-y-4 mt-6">
            <h2 className="text-xl font-semibold text-slate-800">Next Steps</h2>
            <p className="text-sm text-slate-600">
              Ready to engage with {account.name}? You can contact them via email or schedule a demo today.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-full">Contact Account</button>
              <button className="bg-green-600 text-white py-2 px-4 rounded-full">Schedule Demo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDetail;
