// frontend/components/SmartQuoteForm.tsx
import React, { useState } from 'react';
import { submitRFQ } from '../api/rfq';

export default function SmartQuoteForm({ sourcePage }: { sourcePage: string }) {
  const [data, setData] = useState({
    name: '', phone: '', email: '', location: '',
    serviceType: '', urgency: '', description: ''
  });

  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    try {
      const result = await submitRFQ({ ...data, sourcePage });
      alert('✅ Thanks! Please check WhatsApp.');
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={e => { e.preventDefault(); submit(); }}>
      <input type="text" placeholder="Full Name" required onChange={e => setData(d => ({ ...d, name: e.target.value }))} />
      <input type="tel" placeholder="Phone" required onChange={e => setData(d => ({ ...d, phone: e.target.value }))} />
      <input type="email" placeholder="Email (optional)" onChange={e => setData(d => ({ ...d, email: e.target.value }))} />
      <input type="text" placeholder="Location" onChange={e => setData(d => ({ ...d, location: e.target.value }))} />
      <input type="text" placeholder="Service Type" required onChange={e => setData(d => ({ ...d, serviceType: e.target.value }))} />
      <input type="text" placeholder="Urgency" onChange={e => setData(d => ({ ...d, urgency: e.target.value }))} />
      <textarea placeholder="Job Description" required onChange={e => setData(d => ({ ...d, description: e.target.value }))} />
      <button disabled={submitting}>{submitting ? 'Sending…' : 'Send via WhatsApp'}</button>
    </form>
  );
}
