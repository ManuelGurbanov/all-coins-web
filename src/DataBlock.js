import React from "react";

import { translate } from "./Translations";

import { useLanguage } from "./LanguageContext";
export default function DataBlock() {
    const language = useLanguage().language;
    return (
        <section className="w-screen flex items-center justify-center mt-12 mb-12 bg-black lg:text-3xl">
            <div className="sm:w-3/4 w-full sm:grid sm:grid-cols-2 flex-col items-center justify-start p-5 mt-6 mb-6 font-bold text-white sm:rounded-3xl">
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/checklist.webp" alt="placeholder"></img>
                    <p className=" p-2">
                        {translate("reason1", language)}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/hand.webp" alt="placeholder"></img>
                    <p className="p-2">
                        {translate("reason2", language)}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/pc.webp" alt="placeholder"></img>
                    <p className="p-2">
                        {translate("reason3", language)}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/orders.webp" alt="placeholder"></img>
                    <p className="p-2">
                        {translate("reason4", language)}
                    </p>
                </div>
            </div>
        </section>

    );
}