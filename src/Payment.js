import React from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";
export default function Payment() {
  const imgClass = "w-full sm:w-1/2 hover:scale-105 transition duration-75 cursor-pointer";
  const language = useLanguage().language;
  return (
      <article className="flex flex-col items-center justify-center w-4/5 h-full gap-3 mb-12 sm:w-2/3 text-p1 rounded-2xl" data-aos="fade-up" id="payment">
        <h2 className="mt-12 mb-3 text-3xl font-bold">{translate("PAGO", language)}</h2>
        <div className="grid items-center justify-center w-full h-auto grid-cols-3 gap-0 p-4 sm:grid-cols-4 ring-p1 bg-zinc-900 rounded-2xl">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <img className={imgClass} src={`payments/payment${index + 1}.webp`} alt={`Método de pago ${index + 1}`} />
            </div>
          ))}
        </div>
        <h2 className="text-6xl font-bold text-center text-p1 mt-12">
          Ventajas de comprar coins fifa con total seguridad.
        </h2>
        <p className="text-xl font-semibold text-center mb-12 text-gray-300">
          En All Coins Fut garantizamos confianza, velocidad y soporte. Comprar monedas fc 25 con nosotros es fácil, seguro y te da beneficios únicos en cada pedido.<br/>
          1. Atención personalizada por WhatsApp para resolver cualquier duda<br/>
          2. Entregas rápidas en menos de una hora según disponibilidad<br/>
          3. Sin riesgo de baneo usando métodos 100 % seguros<br/>
          4. Más de 3.400 clientes satisfechos en todo el mundo<br/>
          5. Soporte constante durante todo el proceso de compra
        </p>
      </article>
  );
}
