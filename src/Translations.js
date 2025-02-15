const translations = {
    en: {
        "Inicio": "Home",
        "Sobre Nosotros": "About Us",
        "Vender Monedas": "Sell Coins",
        "OFERTA" : "Offer Available!",
        "COMPRA" : "BUY",
        "LLEVATE" : "TAKE",
        "PEDIDO" : "Place your Order",
        "LLEVATE2" : "Take",
        "BONUS" : "to get a",
        "INTERESTED" : "I'm Interested",
        "REGALO" : "as a gift!",
        "COMO" : "HOW TO BUY?",
        "PASO1" : "Choose your Country.",
        "PASO2" : "Select Quantity.",
        "PASO3" : "Follow our instructions.",
        "PASO4" : "Done!",
        "PAGO" : "Payment Methods",
        "BOOSTING" : "Ask about our Boosting Service!",
        "RANGO": "We achieve that range that is difficult for you to reach"
    },
    es: {
        "Inicio": "Inicio",
        "Sobre Nosotros": "Sobre Nosotros",
        "Vender Monedas": "Vender Monedas",
        "OFERTA" : "¡Oferta Disponible!",
        "COMPRA" : "COMPRA",
        "LLEVATE" : "LLEVA",
        "PEDIDO" : "Haz tu Pedido",
        "LLEVATE2" : "Llevate",
        "BONUS" : "para obtener un",
        "INTERESTED" : "Estoy Interesado",
        "REGALO" : "de regalo!",
        "COMO" : "¿CÓMO COMPRAR?",
        "PASO1" : "Elije tu País.",
        "PASO2" : "Selecciona Cantidad.",
        "PASO3" : "Sigue nuestras indicaciones.",
        "PASO4" : "¡Listo!",
        "PAGO" : "Métodos de Pago",
        "BOOSTING" : "¡Pregunta por nuestro Servicio de Boosting!",
        "RANGO": "Conseguimos ese rango al que te cuesta llegar"
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
    