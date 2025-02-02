import React from "react";

export default function Payment () {
  return (
    <div className="flex flex-col items-center justify-start w-full bg-black">
        <article className="flex flex-col items-center justify-center w-full h-full text-p1 gap-3 ">
                <h1 className="text-3xl font-bold mb-2 mt-4">Metodos de Pago</h1>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-0 justify-center items-center w-full h-auto p-4 ring-2 ring-p1">
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment1.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment2.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment3.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment4.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment5.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment6.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment7.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment8.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment9.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment10.webp"></img>
                    <img className="w-full hover:scale-105 transition duration-75 cursor-pointer" src="payments/payment11.webp"></img>
                </div>
        </article>
    </div>
  );
}