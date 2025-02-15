const translations = {
    en: {
        "Inicio": "Home",
        "Sobre Nosotros": "About Us",
        "Vender Monedas": "Sell Coins"
    },
    es: {
        "Inicio": "Inicio",
        "Sobre Nosotros": "Sobre Nosotros",
        "Vender Monedas": "Vender Monedas"
    }
    
  };
    
    export const translate = (key, language) => {
      if (translations[language] && translations[language][key]) {
        return translations[language][key];
      }
      console.warn(`Translation missing for key "${key}" in language "${language}"`);
      return key;
    };
    
    export default translations;
    