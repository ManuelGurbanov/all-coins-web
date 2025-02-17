import React from "react";

export default function DataBlock() {
    return (
        <section className="w-screen flex items-center justify-center mt-12 mb-12 bg-black">
            <div className="sm:w-3/4 w-full sm:grid sm:grid-cols-2 flex-col items-center justify-start p-5 mt-6 mb-6 font-bold text-white sm:rounded-3xl">
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/checklist.webp" alt="placeholder"></img>
                    <p className=" p-2">Obtené tus monedas fácilmente con nuestro método</p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/hand.webp" alt="placeholder"></img>
                    <p className="p-2">Más de 20.000 Clientes satisfechos</p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/pc.webp" alt="placeholder"></img>
                    <p className="p-2">Stock para todas las plataformas </p>
                </div>
                <div className="flex flex-row items-center justify-start h-32 flex-1 ">
                    <img className="h-12 sm:h-24" src="/icons/orders.webp" alt="placeholder"></img>
                    <p className="p-2">Aprovechá nuestras ofertas para SBC</p>
                </div>
            </div>
        </section>

    );
}