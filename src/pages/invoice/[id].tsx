import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface InvoiceData {
  id: string;
  name: string;
  phone: string;
  location: string;
  service_type: string;
  urgency: string;
  description: string;
  status: string;
}

export default function InvoicePage() {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    async function fetchInvoice() {
      try {
        const res = await fetch(`https://rfq-invoice3-io-1.onrender.com/api/invoice/${id}`); // ✅ Fixed backend URL
        const json = await res.json();

        if (res.ok && json) {
          setInvoice(json.invoice ?? json);
        } else {
          setError(json.error || 'Unable to load invoice');
        }
      } catch (err) {
        setError('Something went wrong fetching the invoice.');
      } finally {
        setLoading(false);
      }
    }

    fetchInvoice();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Loading invoice...</p>;
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>❌ {error}</p>;
  if (!invoice) return <p style={{ padding: '2rem' }}>Invoice not found.</p>;

  return (
    <main style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ marginBottom: '1rem' }}>📄 Invoice #{invoice.id}</h1>
      <p><strong>Name:</strong> {invoice.name}</p>
      <p><strong>Phone:</strong> {invoice.phone}</p>
      <p><strong>Location:</strong> {invoice.location}</p>
      <p><strong>Service Type:</strong> {invoice.service_type}</p>
      <p><strong>Urgency:</strong> {invoice.urgency}</p>
      <p><strong>Description:</strong> {invoice.description}</p>
      <p><strong>Status:</strong> {invoice.status}</p>
    </main>
  );
}
