import React, { createContext, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Bookmark {
  id: string;
  title: string;
  hasChapters: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  toggleBookmark: (law: Bookmark) => void;
  isBookmarked: (id: string) => boolean;
  bookmarkCount: number; // Add bookmarkCount to the context
}

interface BookmarkProviderProps {
  children: ReactNode;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  React.useEffect(() => {
    // Load bookmarks from AsyncStorage when the app starts
    async function loadBookmarks() {
      const storedBookmarks = await AsyncStorage.getItem("bookmarkedLaws");
      setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
    }
    loadBookmarks();
  }, []);

  const toggleBookmark = async (law: Bookmark) => {
    let updatedBookmarks: Bookmark[];
    if (bookmarks.some((item) => item.id === law.id)) {
      // Remove bookmark
      updatedBookmarks = bookmarks.filter((item) => item.id !== law.id);
    } else {
      // Add bookmark
      updatedBookmarks = [...bookmarks, law];
    }
    setBookmarks(updatedBookmarks);
    await AsyncStorage.setItem(
      "bookmarkedLaws",
      JSON.stringify(updatedBookmarks)
    );
  };

  const isBookmarked = (id: string) => bookmarks.some((item) => item.id === id);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        bookmarkCount: bookmarks.length, // Calculate count dynamically
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
};
