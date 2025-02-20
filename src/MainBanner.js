import React from "react";
import { useLanguage } from "./LanguageContext";
export default function MainBanner() {
    const language = useLanguage();
    const langua = language.language;
    return (
        <div className="w-screen flex flex-col items-center justify-center mt-12">
            <img className="max-[450px]:hidden w-screen object-cover" src={"desktopBanner_" + langua + ".webp"} alt="bg" data-aos="fade-up"/>

            <img className="hidden max-[450px]:block w-screen object-cover" src={"phoneBanner_" + langua + ".webp"} alt="bg" data-aos="fade-up" />
        </div>
    );
}
