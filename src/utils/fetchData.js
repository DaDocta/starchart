// src/utils/fetchData.js
const fetchData = async (url, options = {}) => {
  try {
    console.log(`Fetching data from ${url} with options:`, options);
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server (${response.status}): ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Fetched JSON data successfully:', data);
      return data;
    } else {
      console.warn('Non-JSON response received:', response);
      return response; // Return raw response for non-JSON content
    }
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchData;
