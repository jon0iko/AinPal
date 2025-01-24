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

export const fetchFootnotes = async (lawId, footnoteNumbers) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/footnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lawId, footnoteNumbers }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching footnotes:", error);
    throw error;
  }
};