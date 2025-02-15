import React, { useState, useRef } from "react";
import ShopTutorial from "./ShopTutorial";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useCountry } from "./LanguageContext";

import { doc, getDoc } from "firebase/firestore";

export default function BuyCoins() {
    const [price, setPrice] = useState(250000);
    const [offer, setOffer] = useState(null);
    const pricePer100 = 3000;
    const phoneNumber = "34671704084";

    const [prices, setPrices] = useState([]);
    const [bonusCoins, setBonusCoins] = useState(0);
    const selectedCountry = useCountry();

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


    const formatPrice = (price) => {
        if (price >= 1000000) {
            return (price / 1000000) + "M";
        } else if (price >= 1000) {
            return Math.floor(price / 1000) + "K";
        }
        return price;
    };
    

    const calculateBonusCoins = () => {
        if (price >= 1000000) return 200000;
        if (price >= 500000) return 50000;
        if (price >= 300000) return 20000;
        return 0;
    };



    useEffect(() => {
        setBonusCoins(calculateBonusCoins());
    }, [price]);

    const openWhatsApp = () => {
        const message = `Hola ¿qué tal? Quería saber si se encuentran disponibles ${formatPrice(price)} para ${platformSelected === "PSXB" ? "el mercado PS/XB" : "PC"}. Gracias!`;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const openWhatsAppOffer = () => {
        const message = offer.message;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const [platformSelected, setPlatformSelected] = useState("PS");

    const fetchOffers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "offers"));
            if (!querySnapshot.empty) {
                const offerData = querySnapshot.docs[0].data();
                setOffer(offerData);
            }
        } catch (error) {
            console.error("Error obteniendo ofertas:", error);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);
    
    const minPrice = 50000;
    const maxPrice = 2000000;
    const barRef = useRef(null);
    const progress = (price / maxPrice) * 100;

    const handleBarClick = (event) => {
        if (!barRef.current) return;
        
        const bar = barRef.current;
        const rect = bar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const newProgress = clickX / rect.width;
    
        let newPrice = minPrice + (maxPrice - minPrice) * newProgress;
    
        if (newPrice < 1000000) {
            newPrice = Math.round(newPrice / 50000) * 50000;
        } else {
            newPrice = Math.round(newPrice / 100000) * 100000;
        }
    
        setPrice(newPrice);
    };


    const [exchangeRates, setExchangeRates] = useState({
        CLP: 0,
        EUR: 0,
        USD: 0,
    });

    useEffect(() => {
        const fetchPrices = async () => {
            console.log("Fetching prices...");
            try {
                const querySnapshot = await getDocs(collection(db, "prices"));
                const pricesData = querySnapshot.docs.map(doc => doc.data());
                setPrices(pricesData);
                
                setExchangeRates({
                    CLP: pricesData[0]["CLP"] || 0,
                    EUR: pricesData[0]["EUR"] || 0,
                    USD: pricesData[0]["USD"] || 0,
                });
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };
        fetchPrices();
    }, []);

    useEffect(() => {
        console.log("Prices fetched:", exchangeRates);
    }, [exchangeRates]);
    
    const calculatePriceForCountry = () => {
        const rate = exchangeRates[selectedCountry.country];
        
        if (!rate) {
            return 0;
        }
        
        const calculatedPrice = (price / 100000) * rate;
        
        let formattedPrice = calculatedPrice;
    
        if (selectedCountry.country === "CLP") {
            formattedPrice = "$" + Math.floor(calculatedPrice);
        } else if (selectedCountry.country === "EUR") {
            formattedPrice = "€" + calculatedPrice.toFixed(2);
        } else {
            formattedPrice = calculatedPrice.toFixed(2);
        }
        
        return formattedPrice + " " + selectedCountry.country.toUpperCase();
    };
    
    
    

    

    return (
        <section className=" flex flex-col items-center justify-center w-full">
            <section className=" flex flex-col items-center justify-center w-3/4">
                <div className="bg-black w-full flex items-center justify-center flex-col lg:flex-row gap-0 lg:px-8 lg:py-2 lg:gap-4" data-aos="fade-up" data-aos-delay="300">

                    
                    <div className="lg:w-1/3 md:w-5/6 h-96 w-screen flex flex-col items-center justify-start lg:mt-6 text-p1 sm:text-lg font-semibold bg-zinc-900 sm:rounded-xl px-2 py-1 relative">
                        <h1 className="z-20 w-full text-center text-3xl font-bold mt-8">¡Oferta Disponible!</h1>

                        {offer && (
                            <>
                                <img className="w-32 z-20" src={offer.player} alt="Oferta" />
                                <h3 className="z-20 font-bold text-lg">COMPRÁ <span className="text-white font-extrabold">{offer.buy}K</span></h3>
                                <h3 className="z-20 font-bold text-lg">LLEVATE <span className="text-white font-extrabold">{offer.take}K</span></h3>
                            </>
                        )}

                        <button className="z-20 bg-p1 rounded-full text-white font-semibold ring-1 ring-white px-3 py-1 hover:scale-105 duration-75 ease-in-out text-sm mt-2" onClick={openWhatsAppOffer}>
                            Estoy Interesado
                        </button>

                        <img className="absolute w-full h-full top-0 left-0 sm:rounded-xl" src="stadiumBg2.webp" alt="Background" />
                    </div>

                    <div className="lg:w-2/3 md:w-5/6 h-96 w-screen flex flex-col sm:gap-2 gap-0 items-center justify-center lg:mt-6 text-white sm:text-lg font-semibold bg-zinc-900 sm:rounded-xl p-2 relative">
                        
                        <div className="w-full flex flex-col md:flex-row md:px-5 items-center justify-center md:justify-between gap-0 mb-3">
                            <h1 className="text-p1 mt-1 mb-2 font-bold text-xl w-full text-center md:text-right md:text-3xl">
                                Haz tu Pedido
                            </h1>  
                            <div className="w-full flex flex-row items-center justify-center gap-0">

                            <div 
                                className={`transition duration-200 cursor-pointer h-16 w-16 flex items-center justify-center gap-3 ${
                                    platformSelected === "PSXB" 
                                    ? "bg-p1 text-white" 
                                    : "bg-transparent text-black"
                                }`} 
                                onClick={() => setPlatformSelected("PSXB")}
                                >
                                <img src="platforms/ps4xbox.webp" className="w-1/2 h-1/2">
                                </img>
                            </div>


                            <div 
                                className={`transition duration-200 cursor-pointer h-16 w-16 flex items-center justify-center ${
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
                            <div className="flex items-center flex-col justify-center sm:mt-2 w-full"> 
                                <span className="text-white text-4xl font-bold">
                                    {formatPrice(price)}
                                </span>
                                <span className="text-white text-xl font-bold">
                                    {calculatePriceForCountry().toLocaleString()}
                                </span>
                                <span className="text-xl font-bold text-green-400">
                                    {calculateBonusCoins() > 0 ?
                                    <h1>¡{calculateBonusCoins()} monedas de REGALO!</h1>
                                    : <h1 className="text-white">Llevate 
                                        <span className="text-p1 font-bold"> +300K </span> 
                                        para obtener un 
                                        <span className="text-p1 font-bold"> BONUS </span>
                                    </h1>}
                                    
                                </span>
                            </div>

                            {/* Barra de Precios */}
                            <div className="w-full flex items-center justify-center sm:mt-4 relative">
                                <button onClick={decreasePrice} className="px-4 py-2 text-white mr-4">&lt;</button>
                                
                                <div 
                                    className="flex-1 h-4 bg-gray-600 rounded-full relative cursor-pointer" 
                                    ref={barRef} 
                                    onMouseDown={handleBarClick}
                                    
                                >
                                    <div
                                        className="h-full bg-p1 rounded-full transition-all duration-300 ease-in-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                    
                                    {/* Marcadores */}
                                    <div className="absolute right-0 -bottom-8 sm:-bottom-11 flex flex-col items-center z-50">
                                        <div className="w-[2px] h-7 bg-white mb-1"></div>
                                        <button className="text-[10px] rounded-3xl p-1 text-white" onClick={() => setPrice(2000000)}>
                                            2M
                                        </button>
                                    </div>
                                    
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 sm:-bottom-11 flex flex-col items-center z-50">
                                        <div className="w-[2px] h-7 bg-white mb-1"></div>
                                        <button className="text-[10px] rounded-3xl p-1 text-white" onClick={() => setPrice(1000000)}>
                                            1M
                                        </button>
                                    </div>
                                </div>
                                
                                <button onClick={increasePrice} className="px-4 py-2 text-white ml-4">&gt;</button>
                            </div>


                            <div className="mt-8 flex items-center justify-center w-full">
                                <button
                                    onClick={openWhatsApp}
                                    className="px-6 py-3 bg-p1 text-white ring-1 ring-white rounded-full hover:scale-105 duration-75 ease-in-out"
                                >
                                    Comprar <strong>{calculatePriceForCountry().toLocaleString()}</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <ShopTutorial/>
        </section>
    );
}
