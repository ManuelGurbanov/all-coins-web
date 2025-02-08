import React from "react";
import { useState } from "react";



export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="w-full h-12 bg-black flex items-center text-p1 justify-between px-8 py-2 z-50 absolute top-0">
            <a href="/home" className="h-full hover:scale-105 transition-all duration-75">
                <img className="h-full" src="logo.webp" >
                </img>
            </a>

            <div className="items-center space-x-4 hidden sm:flex">
                <a href="/home" className="text-white hover:text-p1 transition-all duration-75">
                    Inicio
                </a>
                <a href="/sobre-nosotros" className="text-white hover:text-p1 transition-all duration-75">
                    Sobre Nosotros
                </a>
                <a href="/vender-monedas" className="text-white hover:text-p1 transition-all duration-75">
                    Vender Monedas
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
