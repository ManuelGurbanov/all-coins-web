import React from "react";
import { translate } from "./Translations";

import { useLanguage } from "./LanguageContext";

export default function SellCoins({openWhatsApp}) {
    const language = useLanguage().language;

    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white gap-2 stadium-bg">
        <h1 className="text-4xl font-bold">{translate("sellCoinsTittle", language)}</h1>
        <p className="text-lg text-center">
            {translate("sellCoins", language)}
        </p>
        <button className="px-3 py-1 bg-p1 rounded-full ring-1 ring-white text-xl hover:scale-105 transition duration-75" onClick={() => openWhatsApp()}>
          WhatsApp  
        </button>
      </div>
    );
  }