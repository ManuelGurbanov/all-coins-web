import React from "react";

export default function Nav() {
    return (
        <nav className="w-screen h-12 bg-black flex items-center text-p1 justify-between px-8 py-2 z-50 absolute top-0">
            <a href="#" className="text-xl font-semibold italic">
                ALL COINS
            </a>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:scale-105 transition-all duration-75">
                    Inicio
                </a>
                <a href="#" className="text-white hover:scale-105 transition-all duration-75">
                    Sobre Nosotros
                </a>
                <a href="#" className="text-white hover:scale-105 transition-all duration-75">
                    Comprar
                </a>
            </div>
        </nav>
    );
    }
