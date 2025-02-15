import React from "react";
import { useState } from "react";


import { useLanguage, useCountry } from "./LanguageContext";
import { translate } from "./Translations";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { language, setLanguage } = useLanguage();

    const {country, setCountry} = useCountry();

    const [isCountrySelectOpen, setIsCountrySelectOpen] = useState(false);

    const switchLanguage = () => {
        language === "es" ? setLanguage("en") : setLanguage("es");
    }

    const countries = {
        "ARS": "flags/arg.webp",
        "CLP": "flags/chi.webp",
        "EUR": "flags/eur.webp",
        "USD": "flags/eeuu.webp",
        "MXN": "flags/mxn.webp"
    }

    return (
        <nav className="w-full h-12 bg-black flex items-center text-p1 justify-between px-8 py-2 z-50 absolute top-0">

            <div className="flex items-center space-x-4 h-5">

                <a href="/home" className="h-full hover:scale-105 transition-all duration-75 flex items-center justify-center">
                    <img className="h-9" src="logo.webp" >
                    </img>
                </a>
                <button onClick={() => switchLanguage()} className="text-p1 bg-p1 flex w-28 gap-2 items-center justify-center bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="languageIconTitle" stroke="#BE54E3" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="languageIconTitle">Language</title> <circle cx="12" cy="12" r="10"></circle> <path stroke-linecap="round" d="M12,22 C14.6666667,19.5757576 16,16.2424242 16,12 C16,7.75757576 14.6666667,4.42424242 12,2 C9.33333333,4.42424242 8,7.75757576 8,12 C8,16.2424242 9.33333333,19.5757576 12,22 Z"></path> <path stroke-linecap="round" d="M2.5 9L21.5 9M2.5 15L21.5 15"></path> </g></svg>
                        {language === "es" ? "Español" : "English"}
                </button>

                <button onClick={() => setIsCountrySelectOpen(!isCountrySelectOpen)} className="text-p1 relative bg-p1 flex gap-2 items-center justify-center bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                        {country} <img className="h-4" src={countries[country]}></img>

                        {isCountrySelectOpen &&     
                            <div className="flex flex-col gap-2 absolute bg-black ring-2 ring-black top-12 left-0rounded-lg z-50">
                                {/* <button onClick={() => {setCountry("ARS"); setIsCountrySelectOpen(false)}} className="text-p1 relative bg-p1 flex gap-2 items-center justify-start bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                                    ARS <img className="h-4" src="flags/arg.webp"></img>
                                </button> */}
                                <button onClick={() => {setCountry("CLP"); setIsCountrySelectOpen(false)}} className="text-p1 relative bg-p1 flex gap-2 items-center justify-start bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                                    CLP <img className="h-4" src="flags/chi.webp"></img>
                                </button>
                                <button onClick={() => {setCountry("EUR"); setIsCountrySelectOpen(false)}} className="text-p1 relative bg-p1 flex gap-2 items-center justify-start bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                                    EUR <img className="h-4" src="flags/eur.webp"></img>
                                </button>
                                <button onClick={() => {setCountry("USD"); setIsCountrySelectOpen(false)}} className="text-p1 relative bg-p1 flex gap-2 items-center justify-start bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                                    USD <img className="h-4" src="flags/eeuu.webp"></img>
                                </button>
                                {/* <button onClick={() => {setCountry("MXN"); setIsCountrySelectOpen(false)}} className="text-p1 relative bg-p1 flex gap-2 items-center justify-start bg-opacity-25 hover:bg-opacity-80 hover:text-white transition-all duration-75 p-3">
                                    MXN <img className="h-4" src="flags/mxn.webp"></img>
                                </button> */}
                            </div>
                            
                            }
                </button>

            </div>




            <div className="items-center space-x-4 hidden sm:flex">
                <a href="/home" className="text-white hover:text-p1 transition-all duration-75">
                    {translate("Inicio", language)}
                </a>
                <a href="/sobre-nosotros" className="text-white hover:text-p1 transition-all duration-75">
                    {translate("Sobre Nosotros", language)}
                </a>
                <a href="/vender-monedas" className="text-white hover:text-p1 transition-all duration-75">
                    {translate("Vender Monedas", language)}
                </a>
            </div>

            <button className="block sm:hidden h-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img className="h-6" src="burguerMenu.webp">
                </img>
            </button>

            <div className={`fixed top-0 left-0 w-full h-1/2 bg-black flex items-center justify-center z-50 ring-2 ring-p1 ${isMenuOpen ? "block" : "hidden"}`}>

                <button className="sm:hidden h-12 absolute top-1 right-8" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <img className="h-6" src="close.webp">
                    </img>
                </button>

                <div className="flex flex-col gap-4 font-semibold text-2xl text-white items-center justify-center">
                    <img className="h-16 w-16" src="logo.webp" >
                    </img>
                    <a href="/home" className="hover:text-p1 transition-all duration-75">
                        Inicio
                    </a>
                    <a href="/sobre-nosotros" className=" hover:text-p1 transition-all duration-75">
                        Sobre Nosotros
                    </a>
                    <a href="/vender-monedas" className=" hover:text-p1 transition-all duration-75">
                        Vender Monedas
                    </a>
                </div>
            </div>
        </nav>
    );
    }
