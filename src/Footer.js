import React from "react";

export default function Footer () {

    return (
        <section className="flex flex-row items-center justify-between w-full px-2 py-8 text-xs text-white bg-black sm:px-24 sm:text-base">
            <div className="flex flex-col items-center justify-center w-full">
            <img className="h-32" src="logo.webp">
            </img>
            </div>
            <div className="sm:grid items-center justify-center w-full sm:grid-cols-2 flex flex-col">
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold">Inicio</a>
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold" href="#buycoins">Comprar Monedas</a>
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold" href="#boosting">Boosting</a>
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold" href="#payment">Métodos de Pago</a>
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold" href="/sobre-nosotros">Sobre Nosotros</a>
                <a className="w-full mb-2 text-center cursor-pointer hover:underline text-semibold" href="/vender-monedas">Vende tus Monedas</a>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <a className="w-full mb-2 font-bold text-center duration-75 cursor-pointer hover:scale-105 text-p1" href="https://www.instagram.com/allcoinsfut/" target="_blank" rel="noopener noreferrer">
                    ¡Seguinos en Instagram!
                </a>
                <a href="https://www.instagram.com/allcoinsfut/" target="_blank" rel="noopener noreferrer">
                  <img className="h-12 transition-all duration-75 hover:scale-105" src="logos/instagram.webp" alt="Instagram" />
                </a>
                <a className="w-full mb-2 text-center font-bold cursor-pointer underline text-semibold text-p1" href="https://portfolio-manuel-gurbanov.vercel.app/" target="_blank" rel="noopener noreferrer">
                ¿Quién hizo esta Web?
                </a>
            </div>
        </section>
    )
}