const fetchData = async (url, options = {}) => {
  console.log(`Fetching from ${url} with options:`, options); // Debugging
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server (${response.status}): ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Data fetched successfully:', data); // Debugging
      return data;
    }
    return response; // For non-JSON responses
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
