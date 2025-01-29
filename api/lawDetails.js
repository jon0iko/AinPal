// Fetch law info
export const fetchLawInfo = async (lawId) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL+`/laws/description/${lawId}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching law details:", error);
    throw error; // Re-throw error for the calling component to handle
  }
};

// Fetch the info if a law has chapters and it's title
export const fetchLawDisplayinfo = async (lawId) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL+`/laws/display/${lawId}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching law display info:", error);
    throw error; // Re-throw error for the calling component to handle
  }
}


// Fetch Section lists
export const fetchSections = async (lawId) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL+`/laws/sections/${lawId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
};

// Fetch Constitution Section lists
export const fetchConstitutionSections = async () => {
  try {
    const response = await fetch(
      process.env.EXPO_PUBLIC_API_URL + `/constitution/sections`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Constitution sections:", error);
    return { groupedSections: {} }; // Prevents crashes if API fails
  }
};