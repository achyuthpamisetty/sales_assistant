import React from 'react';
import { useParams } from 'react-router-dom';
import { useSalesforce } from '../context/SalesforceContext';
import ObjectDetail from '../components/objects/ObjectDetail';

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { contacts, loading, getObjectById } = useSalesforce();
  
  const contact = id ? getObjectById('contacts', id) : null;
  
  // Create name for the title
  const fullName = contact ? `${contact.firstName} ${contact.lastName}` : '';
  const subtitle = contact ? contact.title : '';

  return (
    <ObjectDetail
      type="contact"
      data={contact ? { ...contact, name: fullName } : null}
      backPath="/contacts"
      title="Contacts"
      subtitle={subtitle}
      isLoading={loading}
    />
  );
};

export default ContactDetail;