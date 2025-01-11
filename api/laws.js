import api from './index';

// Fetch all laws
export const fetchLaws = async (search, page) => {
  try {
    const response = await fetch(
      `http://your-api.com/laws?search=${encodeURIComponent(search)}&page=${page}`
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching laws:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Fetch details of a specific law by ID
export const fetchLawDetails = async (lawId) => {
    try {
        const response = await api.get(`/laws/${lawId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching law details for ID ${lawId}:`, error);
        throw error;
    }
};
