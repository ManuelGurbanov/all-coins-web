import React from "react";

export default function Payment() {
  const imgClass = "w-full sm:w-1/2 hover:scale-105 transition duration-75 cursor-pointer";

  const phoneNumber = "34671704084";
  
  const openWhatsApp = () => {
    const message = `Hola ¿qué tal? Quería consultar por el servicio de Boosting. Gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
};

  return (
    <div className="flex flex-col items-center justify-start w-full sm:mt-12 stadium-bg">
      <article className="flex flex-col items-center justify-center w-full sm:w-2/3 h-full text-p1 gap-3 mb-12 rounded-2xl">
        <h1 className="text-3xl font-bold mb-8 mt-12">Metodos de Pago</h1>
        <div className="grid sm:grid-cols-4 grid-cols-3 gap-0 justify-center items-center w-full h-auto p-4 ring-2 ring-p1 bg-black">
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <img className={imgClass} src={`payments/payment${index + 1}.webp`} alt={`Método de pago ${index + 1}`} />
            </div>
          ))}
        </div>
      </article>

      <article className="flex flex-col items-center justify-center w-full sm:w-2/3 h-full text-p1 mb-12 rounded-2xl">
          <h1 className="text-3xl font-bold mt-6 w-full text-center">¡Consultá por nuestro Servicio de Boosting!</h1>
          <p className="text-lg font-normal mt-2 mb-8 w-full text-center text-white">Conseguimos ese rango al que te cuesta llegar</p>
          <div className="w-full flex gap-4 p-7 sm:h-64 h-32 items-center justify-center">
              <img src="logos/futchampions.webp" className="h-full"></img>
              <img src="logos/rivals.webp" className="h-full"></img>
              <img src="logos/battles.webp" className="h-full"></img>
          </div>
          <button className="bg-p1 rounded-full text-white text-lg font-semibold ring-1 ring-white px-6 py-2 hover:scale-105 duration-75 ease-in-out" onClick={()=> openWhatsApp()}>
            Estoy Interesado
          </button>
      </article>
    </div>
  );
}
