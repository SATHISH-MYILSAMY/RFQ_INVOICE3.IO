import React, { useState } from 'react';

export default function SmartQuoteForm({ sourcePage }: { sourcePage: string }) {
  const [data, setData] = useState({
    name: '', phone: '', email: '', location: '',
    serviceType: '', urgency: '', description: ''
  });

  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    
    const res = await fetch('https://732d1435377a.ngrok-free.app/api/rfq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, sourcePage }),
    });

    if (res.ok) {
      alert('✅ Thanks! Please check WhatsApp.');
    } else {
      alert('❌ Failed to submit RFQ. Please try again.');
    }

    setSubmitting(false);
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
