import React, { useEffect, useState } from "react";
import { translate } from "./Translations";

import { useLanguage } from "./LanguageContext";

export default function SellCoins({openWhatsApp}) {
    const language = useLanguage().language;
    const [activeFaq, setActiveFaq] = useState(null);

    const faqData = [
      {
        question: "¿Cómo vender monedas de fifa de forma segura con All Coins Fut?",
        answer: "Vender monedas de fifa con AllCoinsFut es completamente seguro. Nuestro proceso se realiza por WhatsApp con atención personalizada, sin contraseñas ni accesos a tu cuenta. Solo debes publicar una carta específica en el mercado, que nosotros compraremos al instante. Todas las instrucciones te las damos paso a paso para que el proceso sea claro y confiable. Usamos métodos que evitan sanciones en tu cuenta y garantizamos el pago inmediato."
      },
      {
        question: "¿Qué necesito tener listo para empezar a vender mis monedas fifa?",
        answer: "Para vender monedas fifa solo necesitas tenerlas disponibles en tu cuenta y escribirnos por WhatsApp. Desde allí te indicaremos qué jugador debes listar en el mercado de transferencias y a qué precio. No necesitas conocimientos técnicos ni experiencia previa, nosotros te guiamos durante todo el proceso. También es importante que tengas acceso a un método de pago como Bizum, PayPal o transferencia. Una vez publicado el jugador y verificada la información, realizamos la compra y te enviamos el pago en minutos."
      },
      {
        question: "¿Cuánto dinero gano al vender monedas de fifa en All Coins Fut?",
        answer: "En All Coins Fut te ofrecemos una tasa competitiva por cada millón de monedas fifa. El valor exacto dependerá del volumen de monedas y del momento de la venta. Al contactarnos por WhatsApp, te daremos una cotización personalizada en tiempo real. Cuantas más monedas vendas, mayor será tu ganancia. Sin letras pequeñas, sin comisiones ocultas. Podrás aceptar o rechazar la oferta sin compromiso."
      },
      {
        question: "¿Qué métodos de pago ofrece AllCoinsFut para mis monedas?",
        answer: "En All Coins Fut ofrecemos distintos métodos de pago seguros y rápidos según tu preferencia. Puedes recibir el dinero por Bizum, PayPal, transferencia bancaria u otro canal acordado previamente. Solo tienes que indicarnos el método que prefieres al iniciar el proceso. Una vez que tu jugador sea comprado, recibirás el pago en minutos. Todo queda confirmado y documentado por WhatsApp. Nos adaptamos a lo que te resulte más cómodo, siempre priorizando tu seguridad y rapidez."
      },
      {
        question: "¿Cuánto tiempo tardan en pagar las monedas vendidas?",
        answer: "Todo el proceso puede durar entre 5 y 30 minutos, dependiendo del volumen de monedas y del tráfico de pedidos en ese momento. En AllCoinsFut somos rápidos, organizados y eficientes. Desde que nos escribes por WhatsApp, gestionamos tu solicitud al instante. Te damos las instrucciones, tú publicas el jugador, lo verificamos y lo compramos. Una vez realizado este paso, el pago se procesa de inmediato. Nuestro equipo está operativo muchas horas al día para asegurar que todo funcione sin esperas. Si quieres vender y cobrar en minutos, este es tu sitio."
      },
      {
        question: "¿Puedo vender monedas fifa sin que me baneen?",
        answer: "Sí, puedes vender monedas de forma segura si usas un método bien gestionado como el que ofrecemos. Sabemos que EA no permite la compraventa de monedas, pero nosotros utilizamos estrategias seguras para minimizar riesgos. Nunca pedimos tus datos personales ni acceso a tu cuenta. Solo usas el mercado de transferencias dentro del juego. Elegimos jugadores que no llamen la atención, con precios adecuados y transacciones únicas."
      },
      {
        question: "¿Puedo vender monedas fifa desde una cuenta nueva o reciente?",
        answer: "Sí, es posible vender monedas incluso si tu cuenta es nueva, siempre que tengas acceso al mercado de transferencias y monedas suficientes. En All Coins Fut no exigimos antigüedad mínima, pero sí recomendamos que tu cuenta haya jugado algunos partidos para evitar restricciones. Si tienes dudas sobre si tu cuenta es válida, simplemente escríbenos por WhatsApp y revisamos tu caso. Estamos aquí para ayudarte."
      }
    ];

    const toggleFaq = (index) => {
      setActiveFaq(activeFaq === index ? null : index);
    };

    useEffect(() => {
      const originalTitle = document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      const originalDescription = metaDescription?.getAttribute('content');

      document.title = 'Vender monedas de fifa fácil y seguro con All Coins Fut online.';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Contacta por WhatsApp y comienza a vender monedas de fifa hoy mismo con total confianza. Nuestro proceso es rápido, seguro, sin complicaciones y con pago garantizado en minutos.');
      }

      return () => {
        document.title = originalTitle;
        if (metaDescription && originalDescription) {
          metaDescription.setAttribute('content', originalDescription);
        }
      };
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white gap-2 stadium-bg">
          <h1 className="text-6xl font-bold text-center text-p1">Vender monedas de fifa nunca fue tan fácil.</h1>
          <p className="text-xl font-semibold text-center mb-12 text-gray-300">
            ¿Tienes monedas de fifa y quieres ganar dinero rápido? Escríbenos por WhatsApp y te las compramos hoy mismo, sin complicaciones ni riesgos.
          </p>
          <button className="px-3 py-1 bg-p1 rounded-full ring-1 ring-white text-xl hover:scale-105 transition duration-75" onClick={() => openWhatsApp()}>
            Vende tus monedas fut por WhatsApp.
          </button>
          <div className="max-w-3xl text-2xl leading-7 text-center flex items-center justify-center flex-col p-6" data-aos="fade-up">
            <h2 className="text-6xl font-bold text-center text-p1 mt-12">
              ¿Cómo funciona el proceso para vender tus monedas fifa 24?
            </h2>
            <p className="text-xl font-semibold text-center mb-12 text-gray-300">
              Vender tus monedas de fifa con nosotros es fácil, seguro y rápido. Solo sigue estos pasos y recibirás tu pago en minutos.<br/>
              1. Escríbenos por WhatsApp indicando cuántas monedas quieres vender<br/>
              2. Te confirmamos disponibilidad y tasa de cambio al instante<br/>
              3. Publicas al jugador que te indicamos en el mercado<br/>
              4. Verificamos la publicación y compramos tu carta<br/>
              5. Recibes el pago por el método acordado, sin demoras
            </p>
          </div>

          <div className="max-w-3xl w-full flex flex-col p-6" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-center text-p1 mb-8">
              Preguntas frecuentes sobre vender monedas fifa
            </h2>
            <div className="w-full">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className="bg-zinc-900 cursor-pointer p-4 pr-12 border border-p1 rounded-xl mb-3 relative hover:bg-zinc-800 transition-colors"
                >
                  <span
                    className="absolute right-4 top-4 text-2xl font-bold text-p1"
                  >
                    {activeFaq === index ? '−' : '+'}
                  </span>
                  <strong className="block font-semibold text-white text-base pr-4">{faq.question}</strong>
                  <div
                    style={{
                      maxHeight: activeFaq === index ? '500px' : '0',
                      opacity: activeFaq === index ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease'
                    }}
                  >
                    <p className="text-gray-300 text-sm leading-relaxed pt-4 text-left">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
  }