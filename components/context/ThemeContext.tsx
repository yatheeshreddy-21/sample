"use client";
import React,{createContext, useContext, useState} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider:React.FC<{children:React.ReactNode}> = ({children}) =>{
  const [isDarkMode,setIsDarkMode] = useState(false);

  const toggleTheme = () =>{
    setIsDarkMode((prev) => !prev);
  }

  return(
    <ThemeContext.Provider value={{isDarkMode,toggleTheme}}>
      <div className={isDarkMode ?"dark":"light"}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = ():ThemeContextType => {
  const context = useContext(ThemeContext);
  if(!context){
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context;
};
