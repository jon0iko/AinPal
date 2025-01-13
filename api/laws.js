
// Fetch all laws
export const fetchLaws = async (search, page) => {
  try {
    // Construct the URL with the base API endpoint
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL+`/laws?search=${encodeURIComponent(search)}&page=${page}`, // Base URL of your API
      {
        method: 'GET', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
      }
    );
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching laws:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
