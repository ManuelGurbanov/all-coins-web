import React from "react";

export default function ShopTutorial() {
    const [activeStep, setActiveStep] = React.useState(1);

    const steps = [
        { id: 1, title: "Elegí tu Plataforma y Monto de Compra.", description: "Seleccioná la cantidad de monedas que deseas comprar y la plataforma en la que juegas." },
        { id: 2, title: "Presioná comprar.", description: "Hacé click en el botón de compra y seguí las instrucciones." },
        { id: 3, title: "Seguí nuestras indicaciones.", description: "Una vez que hayas hecho click en comprar, seguí las instrucciones que te aparecerán en pantalla." },
        { id: 4, title: "¡Listo!", description: "¡Ya podés disfrutar de tus monedas!" }
    ];

    return (
        <div className="lg:w-2/3 md:w-5/6 h-96 w-screen flex flex-row gap-2 items-center justify-center md:mt-6 text-white sm:text-lg font-semibold bg-zinc-900 ring-2 ring-white sm:rounded-xl p-2 relative">
            
            {/* Sección Izquierda */}
            <section className="w-1/2 h-auto flex flex-col items-center justify-start gap-4 mb-3">
                <h1 className="font-bold text-white text-base w-full text-center mt-2">¿CÓMO COMPRAR?</h1>
                {steps.map((step) => (
                    <div 
                        key={step.id} 
                        onClick={() => setActiveStep(step.id)} 
                        className={`w-5/6 h-16 px-2 py-1 flex flex-col items-start justify-center rounded-2xl cursor-pointer transition-all duration-300
                            ${activeStep === step.id ? "bg-zinc-800 ring-2 ring-p1 scale-105" : "bg-zinc-950 ring-1 ring-p1"}
                        `}
                    >
                        <h1 className="font-semibold text-p1 text-base">PASO {step.id}</h1>
                        <h1 className="font-medium text-white text-xs lg:text-md">{step.title}</h1>
                    </div>
                ))}
            </section>


            {/* Línea divisoria */}
            <hr className="h-96 w-[1px] bg-white mr-4 ml-4" />

            {/* Sección Derecha (fija) */}
            <section className="sm:w-[300px] w-[120px] flex-shrink-0 flex flex-col items-center justify-between gap-0 mb-3">
                <img className="sm:h-[150px] h-[130px] sm:w-[150px] object-contain" src="phone.webp" alt="Phone tutorial" />
                <div className="w-full sm:h-[150px]  h-[100px] flex flex-col items-center justify-start gap-3 text-center mt-4">
                    <h1 className="font-bold text-p1 text-2xl">PASO {steps[activeStep - 1].id}</h1>
                    <h1 className="font-medium text-white sm:text-lg text-xs">{steps[activeStep - 1].description}</h1>
                </div>
            </section>

        </div>
    );
}
