import React from "react";

export default function MainBanner () {
    return (
        <>
        <div className="w-full min-h-60vh hidden sm:flex items-center justify-center text-black mt-12 relative bg-white" data-aos="fade-up">
            <section className="flex flex-col gap-0 sm:flex-row items-center justify-center mb-6">
                <img src="logo.webp" className="sm:w-64 w-32 z-20">
                </img>
                <ul className="flex flex-col items-center justify-center smm:text-left text-center font-bold">
                    <li className="text-p2 w-full z-20">+15 MIL seguidores en Instagram</li>
                    <li className="w-full z-20">🥇Los más baratos del mercado (7 años)</li>
                    <li className="w-full z-20">🚀FUT Boosting</li>
                    <li className="w-full z-20">⚡️Promociones y Regalos todos los meses!</li>
                    <li className="w-full z-20">📩Consultanos</li>
                </ul>
                {/* <img className="absolute top-0 left-0 w-full h-full object-cover z-10" src="purple_bg.webp" alt="bg">
                </img> */}
            </section>
        </div>

        <img className="block sm:hidden h-screen w-full object-cover" src="phoneBanner.webp" alt="bg" data-aos="fade-up">
        </img>
        </>
    );
}