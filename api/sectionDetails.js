export const fetchSectionDetails = async (sectionKey) => {
  try {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL+`/sections/${sectionKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching section details:", error);
    throw error;
  }
};