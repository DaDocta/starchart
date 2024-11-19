const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server (${response.status}): ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json(); // Return parsed JSON
    }
    console.log('Non-JSON response received:', response);
    return response; // Return raw response for non-JSON
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchData;
