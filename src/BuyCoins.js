import React, { useState } from "react";
import Payment from './Payment';
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
        const message = `Hola ¿qué tal?, quiero saber si se encuentran disponibles ${formatPrice(price)} para ${platformSelected === "PS" ? "PS4" : platformSelected === "XB" ? "xbox" : "PC"}.`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const [platformSelected, setPlatformSelected] = useState("PS");

    return (
        <section className=" flex flex-col items-center justify-start w-full">
            {/* Fila de Seleccion de Precio y Tutorial */}
            <div className="bg-white w-full flex items-center justify-start flex-col sm:flex-row sm:px-8 sm:py-2 sm:gap-4">

                <div className="sm:w-2/3 w-screen flex gap-2 items-center justify-center sm:mt-6 flex-col text-white sm:text-3xl text-2xl font-semibold bg-zinc-900 ring-2 ring-white sm:rounded-xl p-4 sm:h-80 h-36 relative">
                    <h1 className="w-full text-center z-30">- Seleccioná tu <span className="text-p1">plataforma</span></h1>
                    <h1 className="w-full text-center z-30">- Elegí el monto de compra</h1>
                    <h1 className="w-full text-center z-30">- Presiona comprar!</h1>
                </div>

                <div className="p-4 bg-zinc-900 sm:rounded-xl flex items-center justify-start flex-col sm:mt-6 sm:w-1/3 w-full h-80 ring-2 ring-p1">
                    
                    <div className="w-full flex flex-row items-center justify-between gap-0 mb-3">
                        <h1 className="text-p1 mt-1 mb-2 font-bold text-2xl w-full text-right">Hacé tu pedido</h1>  
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



                    
                        
                    <hr className="w-full bg-zinc-500"></hr>
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
                                className="px-6 py-3 bg-p1 text-white rounded-full hover:bg-p2 transition"
                            >
                                Comprar <strong>${calculatePriceInARS().toLocaleString()} ARS</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white w-full flex items-center justify-start flex-col-reverse sm:flex-row sm:px-8 sm:py-2 sm:gap-4 mb-4">

                <div className="sm:w-1/4 w-screen sm:mt-0 mt-4">
                    <Payment/>
                </div>

                {/* Banner Secundario */}
                <div className="sm:w-3/4 w-screen flex items-center justify-center flex-col text-white sm:text-3xl text-2xl font-semibold bg-zinc-900 ring-2 ring-white sm:rounded-xl p-4 sm:h-80 h-36 relative">
                        <h1 className="w-full text-center z-30">✅Entrega rápida</h1>
                        <h1 className="w-full text-center z-30">✅Sin riesgo de baneo</h1>
                        <h1 className="w-full text-center z-30">✅Mejor precio del mercado</h1>

                        <img className="absolute top-0 left-0 w-full h-full object-cover sm:rounded-xl z-10" src="bg.webp" alt="bg">
                        </img>
                </div>

            </div>


        </section>
    );
}
