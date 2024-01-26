export const apiHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
};

export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      ...apiHeaders,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
