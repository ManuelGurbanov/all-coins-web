import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const useCountry = () => {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es");
  const [country, setCountry] = useState("CLP");
  return (
    <LanguageContext.Provider value={{ language, setLanguage, country, setCountry }}>
      {children}
    </LanguageContext.Provider>
  );
};
