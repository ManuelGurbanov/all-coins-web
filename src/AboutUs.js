import React from "react";
import { translate } from "./Translations";

import { useLanguage } from "./LanguageContext";

export default function AboutUs() {
    const language = useLanguage().language;
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white">
      <h1 className="text-4xl font-bold" data-aos="fade-up">{translate("aboutUs", language)}</h1>
    </div>
  );
}