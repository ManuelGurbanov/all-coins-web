import React from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";


export default function Boosting() {
    const phoneNumber = "34644847922";
    const language = useLanguage().language;
    const openWhatsApp = () => {
      const message = language === "es" 
        ? "👋🏼 ¡Hola! Me gustaría tener más información acerca del servicio de Boosting. Gracias!" 
        : "👋🏼 Hi! I would like to get more information about the Boosting service. Thanks!";

      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(url, "_blank");
    };

    return (
        <article className="flex flex-col items-center justify-center w-full h-full mb-12 sm:w-2/3 text-p1 rounded-2xl" data-aos="fade-up" id="boosting">
          <h1 className="w-full mt-6 text-3xl font-extrabold text-center">{translate("BOOSTING", language)}</h1>
          <p className="w-full mt-2 mb-8 text-lg font-normal text-center text-white">{translate("RANGO", language)}</p>
          <div className="flex items-center justify-center w-full h-32 gap-4 p-7 sm:h-64">
              <img src="logos/futchampions.webp" className="h-full"></img>
              <img src="logos/rivals.webp" className="h-full"></img>
              <img src="logos/battles.webp" className="h-full"></img>
          </div>
          <button className="px-6 py-2 text-lg font-semibold text-white duration-75 ease-in-out rounded-full bg-p1 ring-1 ring-white hover:scale-105" onClick={()=> openWhatsApp()}>
            {translate("INTERESTED", language)}
          </button>
      </article>
    )
}