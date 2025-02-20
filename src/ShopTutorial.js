import React from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";
export default function ShopTutorial() {
    const [activeStep, setActiveStep] = React.useState(1);
    const language = useLanguage().language;

    const steps = [
        { id: 1, title: translate("PASO1", language), link: "step1.webp" },
        { id: 2, title: translate("PASO2", language), link: "step2.webp" },
        { id: 3, title: translate("PASO3", language), link: "step3.webp" },
        { id: 4, title: translate("PASO4", language), link: "step4.webp" }
    ];

    return (
        <div className="h-screen w-screen flex flex-col md:flex-row gap-2 items-center justify-center md:mt-6 text-white sm:text-lg font-semibold bg-p1 ring-2 ring-white sm:rounded-xl p-2 relative">
            
        {/* Sección para móviles */}
        <div className="md:hidden flex flex-col items-center w-full p-4 h-dvh">
            <h1 className="mt-4 mb-2 font-black text-black text-4xl text-center text-nowrap">{translate("COMO", language)}</h1>
            <div className="flex justify-start gap-4 mb-4">
                {steps.map((step) => (
                    <button 
                        key={step.id} 
                        onClick={() => setActiveStep(step.id)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300
                            ${activeStep === step.id ? "bg-zinc-800 ring-2 ring-p1 scale-105" : "bg-zinc-950 ring-1 ring-p1"}
                        `}
                    >
                        {step.id}
                    </button>
                ))}
            </div>
            <img className="w-full h-[50vh] object-contain" src={steps[activeStep - 1].link} alt="Phone tutorial" />
            <h1 className="mt-4 font-black text-black text-xl text-center">{steps[activeStep - 1].title}</h1>
        </div>

        {/* Sección para pantallas grandes */}
        <div className="hidden md:flex h-screen w-screen flex-row gap-2 items-center justify-center">
            {/* Sección Izquierda */}
            <section className="w-1/2 h-auto flex flex-col items-center justify-start gap-4 mb-3">
                <h1 className="font-black text-black text-4xl w-full text-center mt-2">{translate("COMO", language)}</h1>
                {steps.map((step) => (
                    <div 
                        key={step.id} 
                        onClick={() => setActiveStep(step.id)} 
                        className={`w-full h-24 px-2 py-1 flex flex-col items-start justify-start rounded-2xl cursor-pointer transition-all duration-300
                            ${activeStep === step.id ? "bg-zinc-800 ring-2 ring-p1 scale-105" : "bg-zinc-950 ring-1 ring-p1"}
                        `}
                    >
                        <h1 className="font-black text-p1 text-lg">PASO {step.id}</h1>
                        <h1 className="font-medium text-white text-xs lg:text-base">{step.title}</h1>
                    </div>
                ))}
            </section>

            {/* Línea divisoria */}
            <hr className="h-96 w-[1px] bg-white mr-8 ml-8" />

            {/* Sección Derecha (imagen cambia dinámicamente) */}
            <section className="sm:w-[300px] w-[120px] flex-shrink-0 flex flex-col items-center justify-between gap-0 mb-3">
                <img className="h-full object-contain" src={steps[activeStep - 1].link} alt="Phone tutorial" />
            </section>
        </div>
    </div>
    );
}
