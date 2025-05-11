import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Edit,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  User,
  Package,
  Briefcase,
  Check,
  X,
  Linkedin
} from 'lucide-react';

interface ObjectDetailProps {
  type: 'lead' | 'account' | 'contact' | 'opportunity';
  data: any;
  backPath: string;
  title: string;
  subtitle?: string;
  isLoading: boolean;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({
  type,
  data,
  backPath,
  title,
  subtitle,
  isLoading
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data || {});

  if (isLoading) {
    return (
      <div className="mb-8 animate-pulse">
        <div className="h-6 w-48 rounded bg-slate-200"></div>
        <div className="mt-2 h-8 w-64 rounded bg-slate-200"></div>
        <div className="mt-8 h-64 rounded bg-slate-200"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xl font-medium text-slate-800">Item not found</p>
        <Link to={backPath} className="mt-4 inline-block text-primary-600 hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      console.log('Saving changes:', formData);
      setIsEditing(false);
      // Trigger backend update here
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const renderEditableField = (field: any) => {
    const value = formData[field.key];
    return (
      <div key={field.key} className="flex items-start space-x-3">
        <div className="mt-0.5 rounded-full bg-slate-100 p-1.5">
          <field.icon className="h-4 w-4 text-slate-600" />
        </div>
        <div className="flex-1">
          <dt className="text-sm font-medium text-slate-500">{field.label}</dt>
          <dd className="mt-1">
            {isEditing ? (
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <span className="text-sm text-slate-900">{value}</span>
            )}
          </dd>
        </div>
      </div>
    );
  };

  const detailFields = {
    lead: [
      { key: 'firstName', icon: User, label: 'First Name' },
      { key: 'lastName', icon: User, label: 'Last Name' },
      { key: 'email', icon: Mail, label: 'Email' },
      { key: 'phone', icon: Phone, label: 'Phone' },
      { key: 'company', icon: Briefcase, label: 'Company' },
      { key: 'title', icon: User, label: 'Title' },
      { key: 'status', icon: Package, label: 'Status' },
      { key: 'industry', icon: Briefcase, label: 'Industry' },
      { key: 'rating', icon: Package, label: 'Rating' },
      { key: 'leadSource', icon: Package, label: 'Lead Source' },
      { key: 'description', icon: Package, label: 'Description' }
    ],
    account: [
      { key: 'name', icon: Briefcase, label: 'Account Name' },
      { key: 'website', icon: Globe, label: 'Website' },
      { key: 'industry', icon: Briefcase, label: 'Industry' },
      { key: 'type', icon: Package, label: 'Type' },
      { key: 'phone', icon: Phone, label: 'Phone' },
      { key: 'billingStreet', icon: MapPin, label: 'Billing Street' },
      { key: 'billingCity', icon: MapPin, label: 'Billing City' },
      { key: 'billingState', icon: MapPin, label: 'Billing State' },
      { key: 'billingPostalCode', icon: MapPin, label: 'Billing Postal Code' },
      { key: 'billingCountry', icon: MapPin, label: 'Billing Country' },
      { key: 'description', icon: Package, label: 'Description' }
    ],
    contact: [
      { key: 'firstName', icon: User, label: 'First Name' },
      { key: 'lastName', icon: User, label: 'Last Name' },
      { key: 'email', icon: Mail, label: 'Email' },
      { key: 'phone', icon: Phone, label: 'Phone' },
      { key: 'title', icon: User, label: 'Title' },
      { key: 'department', icon: Briefcase, label: 'Department' },
      { key: 'accountName', icon: Briefcase, label: 'Account' },
      { key: 'mailingStreet', icon: MapPin, label: 'Mailing Street' },
      { key: 'mailingCity', icon: MapPin, label: 'Mailing City' },
      { key: 'mailingState', icon: MapPin, label: 'Mailing State' },
      { key: 'mailingPostalCode', icon: MapPin, label: 'Mailing Postal Code' },
      { key: 'mailingCountry', icon: MapPin, label: 'Mailing Country' }
    ],
    opportunity: [
      { key: 'name', icon: Package, label: 'Opportunity Name' },
      { key: 'accountName', icon: Briefcase, label: 'Account Name' },
      { key: 'type', icon: Package, label: 'Type' },
      { key: 'stage', icon: Package, label: 'Stage' },
      { key: 'amount', icon: Package, label: 'Amount' },
      { key: 'probability', icon: Package, label: 'Probability' },
      { key: 'closeDate', icon: Calendar, label: 'Close Date' },
      { key: 'nextStep', icon: Package, label: 'Next Step' },
      { key: 'description', icon: Package, label: 'Description' }
    ]
  };

  const renderLinkedInSection = () => {
    const linkedInData = data.insights?.linkedInNews || [];
    const profile = {
      imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${data.firstName}%20${data.lastName}`,
      headline: data.title,
      company: data.company || data.accountName,
      connections: "500+",
      activity: linkedInData
    };

    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">LinkedIn Profile</h2>
          <Linkedin className="h-5 w-5 text-[#0A66C2]" />
        </div>
        <div className="flex items-start space-x-4">
          <img
            src={profile.imageUrl}
            alt={`${data.firstName} ${data.lastName}`}
            className="h-16 w-16 rounded-full bg-slate-100"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {data.firstName} {data.lastName}
            </h3>
            <p className="text-sm text-slate-600">{profile.headline}</p>
            <p className="text-sm text-slate-500">{profile.company}</p>
            <p className="mt-1 text-sm text-slate-500">{profile.connections} connections</p>
          </div>
        </div>

        {profile.activity.length > 0 && (
          <>
            <div className="my-4 border-t border-slate-200"></div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-slate-700">Recent Activity</h4>
              <div className="space-y-3">
                {profile.activity.map((item: any, index: number) => (
                  <div key={index} className="rounded-md border border-slate-200 p-3">
                    <p className="text-sm text-slate-900">{item.headline}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <Link to={backPath} className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to {title}
        </Link>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {data.name || `${data.firstName} ${data.lastName}`}
          </h1>
          {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                <Check className="mr-2 h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <dl className="space-y-6">
        {detailFields[type].map(renderEditableField)}
      </dl>

      {(type === 'lead' || type === 'contact') && renderLinkedInSection()}
    </div>
  );
};

export default ObjectDetail;
