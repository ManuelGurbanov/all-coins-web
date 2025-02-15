import React from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";
export default function Payment() {
  const imgClass = "w-full sm:w-1/2 hover:scale-105 transition duration-75 cursor-pointer";
  const language = useLanguage().language;
  return (
      <article className="flex flex-col items-center justify-center w-4/5 sm:w-2/3 h-full text-p1 gap-3 mb-12 rounded-2xl" data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-3 mt-12">{translate("PAGO", language)}</h1>
        <div className="grid sm:grid-cols-4 grid-cols-3 gap-0 justify-center items-center w-full h-auto p-4 ring-p1 bg-zinc-900 rounded-2xl">
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <img className={imgClass} src={`payments/payment${index + 1}.webp`} alt={`Método de pago ${index + 1}`} />
            </div>
          ))}
        </div>
      </article>
  );
}
