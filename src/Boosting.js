import React from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";


export default function Boosting() {
    const phoneNumber = "34644847922";
    const language = useLanguage().language;
    const openWhatsApp = () => {
      const message = `Hola ¿qué tal? Quería consultar por el servicio de Boosting. Gracias!`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(url, "_blank");
    };

    return (
        <article className="flex flex-col items-center justify-center w-full sm:w-2/3 h-full text-p1 mb-12 rounded-2xl" data-aos="fade-up">
          <h1 className="text-3xl font-extrabold mt-6 w-full text-center">{translate("BOOSTING", language)}</h1>
          <p className="text-lg font-normal mt-2 mb-8 w-full text-center text-white">{translate("RANGO", language)}</p>
          <div className="w-full flex gap-4 p-7 sm:h-64 h-32 items-center justify-center">
              <img src="logos/futchampions.webp" className="h-full"></img>
              <img src="logos/rivals.webp" className="h-full"></img>
              <img src="logos/battles.webp" className="h-full"></img>
          </div>
          <button className="bg-p1 rounded-full text-white text-lg font-semibold ring-1 ring-white px-6 py-2 hover:scale-105 duration-75 ease-in-out" onClick={()=> openWhatsApp()}>
            {translate("INTERESTED", language)}
          </button>
      </article>
    )
}