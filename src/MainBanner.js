import React from "react";

export default function MainBanner () {
    return (
        <div className="w-full h-60vh bg-zinc-900 flex items-center justify-center text-white mt-12">
            <section className="flex flex-col gap-0 sm:flex-row items-center justify-center mb-6">
                <img src="logo.webp" className="sm:w-64 w-32">
                </img>
                <ul className="flex flex-col items-center justify-center smm:text-left text-center font-bold">
                    <li className="text-p2 w-full">+15 MIL seguidores en Instagram</li>
                    <li className="w-full">🥇Los más baratos del mercado (7 años)</li>
                    <li className="w-full">🚀FUT Boosting</li>
                    <li className="w-full">⚡️Promociones y Regalos todos los meses!</li>
                    <li className="w-full">📩Consultanos</li>
                </ul>
            </section>
        </div>
    );
}