import React, { useState, useRef, useEffect } from "react";
import ShopTutorial from "./ShopTutorial";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useCountry } from "./LanguageContext";

import { translate } from "./Translations";

import { useLanguage } from "./LanguageContext";
import BuyBox from "./BuyBox";

export default function BuyCoins() {
    const [price, setPrice] = useState(250000);
    const phoneNumber = "34644847922";

    const [, setPrices] = useState([]);
    const [, setBonusCoins] = useState(0);
    const selectedCountry = useCountry();

    const increasePrice = () => {
        if (price < 2000000) {
            setPrice(price + 50000);
        }
    };

    const decreasePrice = () => {
        if (price > 100000) {
            setPrice(price - 50000);
        }
    };


    const formatPrice = (price) => {
            return Math.floor(price / 1000) + "K";
    };

    const formatPriceMessage = (price) => {
        return Math.floor(price / 1000) + "K";
    }
    

    const calculateBonusCoins = () => {
        if (price >= 1000000) return "50K";
        else if (price >= 500000) return "25K";
        return null;
    };



    useEffect(() => {
        setBonusCoins(calculateBonusCoins());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [price]);

    const openWhatsApp = () => {
        const message = language === "es" 
        ? `👋🏼 Hola! Estoy interesado en ${formatPriceMessage(price)} para ${platformSelected === "PSXB" ? "PS/XB" : "PC"}. Gracias!` 
        : `👋🏼 Hi! I’m interested in ${formatPriceMessage(price)} for ${platformSelected === "PSXB" ? "PS/XB" : "PC"} platform. Thanks!`;

        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, "_blank");
    };

    const [platformSelected, setPlatformSelected] = useState("PSXB");    
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
        CLP: { PC: 0, PSXB: 0 },
        EUR: { PC: 0, PSXB: 0 },
        USD: { PC: 0, PSXB: 0 },
        MXN: { PC: 0, PSXB: 0 },
        COP: { PC: 0, PSXB: 0 },
        ARS: { PC: 0, PSXB: 0 },
    });
    
    const fetchPrices = async () => {
        console.log("Fetching prices...");
        try {
            const querySnapshot = await getDocs(collection(db, "prices"));
            if (!querySnapshot.empty) {
                const pricesData = querySnapshot.docs[0].data();
                setPrices(pricesData);
    
                setExchangeRates({
                    CLP: { PC: pricesData.CLP?.PC || 0, PSXB: pricesData.CLP?.PSXB || 0 },
                    EUR: { PC: pricesData.EUR?.PC || 0, PSXB: pricesData.EUR?.PSXB || 0 },
                    USD: { PC: pricesData.USD?.PC || 0, PSXB: pricesData.USD?.PSXB || 0 },
                    MXN: { PC: pricesData.MXN?.PC || 0, PSXB: pricesData.MXN?.PSXB || 0 },
                    COP: { PC: pricesData.COP?.PC || 0, PSXB: pricesData.COP?.PSXB || 0 },
                    ARS: { PC: pricesData.ARS?.PC || 0, PSXB: pricesData.ARS?.PSXB || 0 },
                });
            }
        } catch (error) {
            console.error("Error fetching prices:", error);
        }
    };
    
    useEffect(() => {
        fetchPrices();
    }, []);
    
    useEffect(() => {
        console.log("Prices fetched:", exchangeRates);
    }, [exchangeRates]);
    
    const calculatePriceForCountry = () => {
        const rate = exchangeRates[selectedCountry.country]?.[platformSelected];
    
        if (!rate) {
            return language === "es" ? "Cargando..." : "Loading...";
        }
    
        const calculatedPrice = (price / 100000) * rate;
        let formattedPrice;
    
        if (["CLP", "COP", "MXN", "ARS"].includes(selectedCountry.country)) {
            formattedPrice = "$" + Math.floor(calculatedPrice).toLocaleString("es-ES");
        } else if (selectedCountry.country === "EUR") {
            formattedPrice = "€" + calculatedPrice.toFixed(2);
        } else {
            formattedPrice = calculatedPrice.toFixed(2);
        }
    
        return formattedPrice + " " + selectedCountry.country.toUpperCase();
    };
    
    
    

    const language = useLanguage().language;

    return (
        <section className="flex flex-col items-center justify-center w-full" id="buycoins">
            <section className="flex flex-col items-center justify-center w-3/4 ">
                <div className="flex flex-col items-center justify-center w-full gap-0 bg-black lg:flex-row lg:px-8 lg:py-2 lg:gap-4" data-aos="fade-up" data-aos-delay="300">

                    <div className="relative flex flex-col items-center justify-center w-screen gap-0 p-2 font-semibold text-white lg:w-2/3 md:w-5/6 min-h-96 lg:mt-6 sm:text-lg bg-zinc-900 sm:rounded-xl">
                        
                        <div className="flex flex-row items-center justify-center w-full gap-0 mb-3 md:px-5 md:justify-between">
                            <h2 className="w-full mt-1 mb-2 text-3xl font-bold text-center text-p1 md:text-right md:text-4xl">
                                {translate("PEDIDO", language)}
                            </h2>  
                            <div className="flex flex-row items-center justify-center w-full gap-0">

                            <div 
                                className={`transition duration-200 cursor-pointer h-16 w-16 flex items-center justify-center gap-3 ${
                                    platformSelected === "PSXB" 
                                    ? "bg-p1 text-white" 
                                    : "bg-transparent text-black"
                                }`} 
                                onClick={() => setPlatformSelected("PSXB")}
                                >
                                <img src="platforms/ps4xbox.webp" className="w-1/2 h-1/2" alt="PS4/Xbox" />
                            </div>


                            <div 
                                className={`transition duration-200 cursor-pointer h-16 w-16 flex items-center justify-center ${
                                    platformSelected === "PC" 
                                    ? "bg-p1 text-white" 
                                    : "bg-transparent text-black"
                                }`} 
                                onClick={() => setPlatformSelected("PC")}
                                >
                                <img src="platforms/origin.webp" className="w-1/2 h-1/2" alt="PC" />
                            </div>

                            </div>
                    </div>



                        
                            
                        <hr className="hidden w-full bg-zinc-500 lg:block"></hr>
                        <BuyBox 
                            formatPrice={formatPrice} 
                            price={price} 
                            calculatePriceForCountry={calculatePriceForCountry} 
                            calculateBonusCoins={calculateBonusCoins} 
                            increasePrice={increasePrice} 
                            decreasePrice={decreasePrice} 
                            setPrice={setPrice} 
                            openWhatsApp={openWhatsApp} 
                            barRef={barRef} 
                            handleBarClick={handleBarClick} 
                            progress={progress} 
                            selectedPlatform = {platformSelected}
                        />

                    </div>
                </div>

            </section>
            <ShopTutorial/>
        </section>
    );
}
