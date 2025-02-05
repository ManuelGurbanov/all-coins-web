import React from "react";

export default function Footer () {

    return (
        <section className="w-full bg-zinc-700 flex flex-row items-center justify-between text-white sm:px-24 px-4 py-8 text-xs sm:text-base">
            <div className="flex flex-col w-full items-center justify-center">
            <img className="h-32" src="logo.webp">
            </img>
            </div>
            <div className="flex flex-col w-full items-center justify-center">
                <a className="hover:underline mb-2 text-semibold cursor-pointer w-full text-center">Inicio</a>
                <a className="hover:underline mb-2 text-semibold cursor-pointer w-full text-center">Comprar Monedas</a>
                <a className="hover:underline mb-2 text-semibold cursor-pointer w-full text-center">Boosting</a>
                <a className="hover:underline mb-2 text-semibold cursor-pointer w-full text-center">Métodos de Pago</a>
                <a className="hover:underline mb-2 text-semibold cursor-pointer w-full text-center">Sobre Nosotros</a>
            </div>
            <div className="flex flex-col w-full items-center justify-center">
                <a className="hover:underline mb-2 font-bold cursor-pointer text-center w-full text-p1">¡Seguinos en Instagram!</a>
                <img className="h-12" src="logos/instagram.webp">
                </img>
            </div>
        </section>
    )
}