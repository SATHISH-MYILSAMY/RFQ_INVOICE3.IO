export async function submitRFQ(data: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rfq`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || 'Failed to submit RFQ');
  }

  return result;
}