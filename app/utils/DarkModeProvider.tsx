import React, { useState } from "react";
import DarkMode from "./darkmode.context";

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = useState(true);

  return (
    <DarkMode.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        useDeviceSettings,
        setUseDeviceSettings,
      }}
    >
      {children}
    </DarkMode.Provider>
  );
};
