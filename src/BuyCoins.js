import React, { useState } from "react";

export default function BuyCoins() {
    const [price, setPrice] = useState(0);

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
        const message = `Hola ¿qué tal?, quiero saber si se encuentran disponibles ${formatPrice(price)}`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    return (
        <div className="h-screen bg-zinc-800 w-full flex items-center justify-start flex-col">
            <h1 className="text-p1 mt-6 font-bold text-4xl">Comprar Monedas</h1>

            <div className="w-full px-4 md:w-96">
                <div className="flex items-center flex-col justify-center mt-2 w-full"> 
                    <span className="text-white text-lg font-bold">
                        {formatPrice(price)}
                    </span>
                    <span className="text-white text-lg ">
                        {calculatePriceInARS().toLocaleString()} ARS
                    </span>
                </div>

                {/* Barra de Precios */}
                <div className="w-full flex items-center justify-center sm:mt-4">
                    <button
                        onClick={decreasePrice}
                        className="px-4 py-2 text-white bg-red-500 rounded-full mr-4 hover:bg-red-600 transition"
                    >
                        -
                    </button>

                    <div className="flex-1 h-4 bg-gray-600 rounded-full relative">
                        <div
                            className="h-full bg-p1 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <button
                        onClick={increasePrice}
                        className="px-4 py-2 text-white bg-green-500 rounded-full ml-4 hover:bg-green-600 transition"
                    >
                        +
                    </button>
                </div>

                <div className="mt-5 flex items-center justify-center w-full">
                    <button
                        onClick={openWhatsApp}
                        className="px-6 py-3 bg-p1 text-white rounded-full hover:bg-p2 transition"
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    );
}
