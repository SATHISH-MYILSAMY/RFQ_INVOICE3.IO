export async function submitRFQ(data: any) {
  const res = await fetch('https://rfq-invoice3-backend.onrender.com/api/rfq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
