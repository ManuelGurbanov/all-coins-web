import React from "react";

export default function Nav() {
    return (
        <nav className="w-full h-12 bg-black flex items-center text-p1 justify-between px-8 py-2 z-50 absolute top-0">
            <img className="h-full" src="logo.webp">
            </img>
            <div className="items-center space-x-4 hidden sm:flex">
                <a href="#" className="text-white hover:text-p1 transition-all duration-75">
                    Inicio
                </a>
                <a href="#" className="text-white hover:text-p1 transition-all duration-75">
                    Sobre Nosotros
                </a>
                <a href="#" className="text-white hover:text-p1 transition-all duration-75">
                    Comprar
                </a>
            </div>
        </nav>
    );
    }
