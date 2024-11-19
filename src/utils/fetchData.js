const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from server (${response.status}): ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    // Always attempt to parse the response as JSON
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchData;
