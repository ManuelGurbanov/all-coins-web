import React, { useState } from "react";
import Payment from './Payment';
import ShopTutorial from "./ShopTutorial";
export default function BuyCoins() {
    const [price, setPrice] = useState(250000);

    const pricePer100 = 3000;
    const phoneNumber = "34671704084";

    const increasePrice = () => {
        if (price < 2000000) {
            setPrice(price + (price >= 1000000 ? 100000 : 50000));
        }
    };

    const decreasePrice = () => {
        if (price > 50000) {
            setPrice(price - (price >= 1000000 ? 100000 : 50000));
        }
    };

    const progress = (price / 2000000) * 100;

    const formatPrice = (price) => {
        if (price >= 1000000) {
            return (price / 1000000) + "M";
        } else if (price >= 1000) {
            return Math.floor(price / 1000) + "K";
        }
        return price;
    };

    const calculatePriceInARS = () => {
        const coinsInHundreds = price / 100000;
        return coinsInHundreds * pricePer100;
    };

    const openWhatsApp = () => {
        const message = `Hola ¿qué tal? Quería saber si se encuentran disponibles ${formatPrice(price)} para ${platformSelected === "PS" ? "PS4" : platformSelected === "XB" ? "xbox" : "PC"}. Gracias!`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const [platformSelected, setPlatformSelected] = useState("PS");

    return (
        <section className=" flex flex-col items-center justify-start w-full">
            {/* Fila de Seleccion de Precio y Tutorial */}
            <div className="bg-white w-full flex items-center justify-center flex-col lg:flex-row gap-0 lg:px-8 lg:py-2 lg:gap-4">

                <ShopTutorial/>

                <div className="lg:w-2/3 md:w-5/6 h-96 w-screen flex flex-col gap-2 items-center justify-center lg:mt-6 text-white sm:text-lg font-semibold bg-zinc-900 ring-2 ring-white sm:rounded-xl p-2 relative">
                    
                    <div className="w-full flex flex-col md:flex-row md:px-5 items-center justify-center md:justify-between gap-0 mb-3">
                        <h1 className="text-p1 mt-1 mb-2 font-bold text-3xl w-full text-center md:text-right md:text-4xl">Hacé tu pedido</h1>  
                        <div className="w-full flex flex-row items-center justify-center gap-0">

                        <div 
                            className={`transition duration-200 cursor-pointer h-12 w-12 flex items-center justify-center ${
                                platformSelected === "PS" 
                                ? "bg-p1 text-white" 
                                : "bg-transparent text-black"
                            }`} 
                            onClick={() => setPlatformSelected("PS")}
                            >
                        <img src="platforms/ps4.webp" className="w-1/2 h-1/2">
                        </img>
                        </div>

                        <div 
                            className={`transition duration-200 cursor-pointer h-12 w-12 flex items-center justify-center ${
                                platformSelected === "XB" 
                                ? "bg-p1 text-white" 
                                : "bg-transparent text-black"
                            }`} 
                            onClick={() => setPlatformSelected("XB")}
                            >

                            <img src="platforms/xbox.webp" className="w-1/2 h-1/2">
                            </img>
                        </div>


                        <div 
                            className={`transition duration-200 cursor-pointer h-12 w-12 flex items-center justify-center ${
                                platformSelected === "PC" 
                                ? "bg-p1 text-white" 
                                : "bg-transparent text-black"
                            }`} 
                            onClick={() => setPlatformSelected("PC")}
                            >
                            <img src="platforms/origin.webp" className="w-1/2 h-1/2">
                            </img>
                        </div>

                        </div>
                </div>



                    
                        
                    <hr className="w-full bg-zinc-500 hidden lg:block"></hr>
                    <div className="w-full px-4">
                        <div className="flex items-center flex-col justify-center mt-2 w-full"> 
                            <span className="text-white text-4xl font-bold">
                                {formatPrice(price)}
                            </span>
                            <span className="text-white text-lg ">
                                {calculatePriceInARS().toLocaleString()} ARS
                            </span>
                        </div>

                        {/* Barra de Precios */}
                        <div className="w-full flex items-center justify-center sm:mt-4 relative">
                            <button
                                onClick={decreasePrice}
                                className="px-4 py-2 text-white mr-4"
                            >
                                &lt;
                            </button>

                            <div className="flex-1 h-4 bg-gray-600 rounded-full relative">
                                <div
                                    className="h-full bg-p1 rounded-full transition-all duration-300 ease-in-out"
                                    style={{ width: `${progress}%` }}
                                >
                                
                                </div>

                                <div
                                    className="h-full w-full  relative">

                                <div className="absolute right-0 -bottom-4 flex flex-col items-center z-50">
                                <div className="w-[2px] h-7 bg-white mb-1"></div>
                                <button className="text-[10px] rounded-3xl p-1 text-white" onClick={() => setPrice(2000000)}>
                                    2M
                                </button>
                            </div>

                            {/* Marcador 1M */}
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex flex-col items-center z-50">
                                <div className="w-[2px] h-7 bg-white mb-1"></div>
                                <button className="text-[10px] rounded-3xl p-1 text-white" onClick={() => setPrice(1000000)}>
                                    1M
                                </button>
                            </div>

                            {/* Marcador 750K */}

                                </div>
                            </div>

                            <button
                                onClick={increasePrice}
                                className="px-4 py-2 text-white ml-4"
                            >
                                &gt;
                            </button>
                        </div>


                        <div className="mt-8 flex items-center justify-center w-full">
                            <button
                                onClick={openWhatsApp}
                                className="px-6 py-3 bg-p1 text-white ring-1 ring-white rounded-full hover:bg-p2 transition"
                            >
                                Comprar <strong>${calculatePriceInARS().toLocaleString()} ARS</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
