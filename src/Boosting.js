import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { translate } from "./Translations";
import { db, doc, getDoc } from './firebaseConfig';
import { useCountry } from "./LanguageContext";
import RightArrow from "./RightArrow";

const CURRENCY_TO_COUNTRY = {
  EUR: "ES",
  USD: "US", 
  ARS: "AR",
  MXN: "MX",
  CLP: "CL",
  COP: "CO"
};

export default function Boosting() {
  const phoneNumber = "34644847922";
  const language = useLanguage().language;
  const [selectedMode, setSelectedMode] = useState("futchampions");
  const [selectedRank, setSelectedRank] = useState("1");
  const [currentDivision, setCurrentDivision] = useState("10");
  const [targetDivision, setTargetDivision] = useState("1");
  
  const userCurrency = useCountry().country;
  const userCountry = CURRENCY_TO_COUNTRY[userCurrency] || "ES";
  
  const [prices, setPrices] = useState({
    futchampions: {},
    rivals: {},
    qualifier: 35
  });

  const futChampionsRanks = [
    { rank: "1", wins: "15", rewards: [ "200.000 Monedas", "Sobre de Jugadores 85+ x10 Transferible", "Sobre de Jugadores 84+ x10 Transferible", "Sobre de Iconos Base Intransferible", "Sobre de Jugadores 89+ x2 Intransferible", "Sobre de Jugadores 82+ x30 Intransferible", "Tres Sobres de TOTW x3 Transferibles" ] },
    { rank: "2", wins: "13", rewards: [ "110.000 Monedas", "2 Sobres de Jugadores 84+ x10 Transferibles", "Sobre de Héroe 86+ Intransferible", "Sobre de Jugadores 88+ x2 Intransferible", "Sobre de Jugadores 82+ x25 Intransferible", "2 Sobres de TOTW x3 Transferibles" ] },
    { rank: "3", wins: "11", rewards: [ "80.000 Monedas", "Sobre de Jugadores 83+ x10 Transferible", "Sobre de Héroe Base Intransferible", "Sobre de Jugadores 87+ x2 Intransferible", "Sobre de Jugadores 82+ x20 Intransferible", "2 Sobres de TOTW x3 Transferibles" ] },
    { rank: "4", wins: "10", rewards: [ "60.000 Monedas", "Sobre de Jugadores 83+ x10 Transferible", "Sobre de Héroe Base Intransferible", "Sobre de Jugador 87+ x1 Transferible", "Sobre de Jugadores 81+ x20 Intransferible", "2 Sobres de TOTW x1 Jugador Transferibles" ] },
    { rank: "5", wins: "9", rewards: [ "45.000 Monedas", "Sobre de Jugadores 82+ x10 Transferible", "Sobre de Héroe Máx 87 Intransferible", "Sobre de Jugador 87+ x1 Intransferible", "Sobre de Jugadores 81+ x15 Intransferible", "Sobre de TOTW x1 Jugador Transferible" ] },
    { rank: "6", wins: "8", rewards: [ "30.000 Monedas", "Sobre de Jugadores 82+ x10 Transferible", "Sobre de Jugadores 86+ x2 Intransferible", "Sobre de Jugadores 81+ x15 Intransferible", "2 Sobres de TOTW x1 Jugador Transferibles" ] },
    { rank: "7", wins: "7", rewards: [ "25.000 Monedas", "Sobre de Jugadores 81+ x11 Transferible", "2 Sobres de Jugador 86+ x1 Intransferibles", "2 Sobres de Jugadores 77+ x7 Intransferibles", "Sobre de TOTW x1 Jugador Transferible" ] },
    { rank: "8", wins: "6", rewards: [ "20.000 Monedas", "Sobre de Jugadores 81+ x11 Transferible", "2 Sobres de Jugador 85+ x1 Intransferibles", "Sobre de Jugadores 77+ x7 Intransferible", "Sobre de TOTW x1 Jugador Transferible" ] }
  ];

  // Funciones para Fut Champions
  const increaseRank = () => {
    const currentIndex = futChampionsRanks.findIndex(r => r.rank === selectedRank);
    if (currentIndex > 0) {
      setSelectedRank(futChampionsRanks[currentIndex - 1].rank);
    }
  };

  const decreaseRank = () => {
    const currentIndex = futChampionsRanks.findIndex(r => r.rank === selectedRank);
    if (currentIndex < futChampionsRanks.length - 1) {
      setSelectedRank(futChampionsRanks[currentIndex + 1].rank);
    }
  };

  // Funciones para Rivals
  const increaseCurrentDivision = () => {
    const current = parseInt(currentDivision);
    if (current < 10) {
      setCurrentDivision((current + 1).toString());
    }
  };

  const decreaseCurrentDivision = () => {
    const current = parseInt(currentDivision);
    if (current > 2) {
      setCurrentDivision((current - 1).toString());
    }
  };

  const increaseTargetDivision = () => {
    const target = parseInt(targetDivision);
    if (target < 9) {
      setTargetDivision((target + 1).toString());
    }
  };

  const decreaseTargetDivision = () => {
    const target = parseInt(targetDivision);
    if (target > 1) {
      setTargetDivision((target - 1).toString());
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const docRef = doc(db, "boosting", "prices");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPrices(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    fetchPrices();
  }, []);

  const getPrice = () => {
    if (selectedMode === "futchampions") {
      return prices.futchampions?.[`rank${selectedRank}`]?.[userCountry] || 0;
    } else if (selectedMode === "rivals") {
      const current = parseInt(currentDivision);
      const target = parseInt(targetDivision);
      if (current <= target) return 0;

      let totalPrice = 0;
      for (let div = current; div > target; div--) {
        const stepKey = `${div}-${div-1}`;
        const stepPrice = prices.rivals?.[stepKey]?.[userCountry] || 0;
        totalPrice += stepPrice;
      }
      return totalPrice;
    } else if (selectedMode === "qualifier") {
      return prices.qualifier?.[userCountry] || 35;
    }
    return 0;
  };

  const formatPrice = (price) => {
    if (!price) return "€0";
    
    const currencyConfig = {
      "EUR": { symbol: "€", decimals: true },
      "ARS": { symbol: "$", decimals: false, name: "ARS" },
      "MXN": { symbol: "$", decimals: false, name: "MXN" },
      "CLP": { symbol: "$", decimals: false, name: "CLP" },
      "COP": { symbol: "$", decimals: false, name: "COP" },
      "USD": { symbol: "$", decimals: true, name: "USD" }
    };

    const config = currencyConfig[userCurrency] || currencyConfig["EUR"];
    const formattedNumber = config.decimals 
      ? price.toFixed(2) 
      : Math.floor(price).toLocaleString("es-ES");
    
    return `${config.symbol}${formattedNumber}${config.name ? " " + config.name : ""}`;
  };

  const openWhatsApp = () => {
    const price = getPrice();
    let modeText = "";
    
    if (selectedMode === "futchampions") {
      const rank = futChampionsRanks.find(r => r.rank === selectedRank);
      modeText = `Fut Champions - Rango ${rank.rank} (${rank.wins} victorias)`;
    } else if (selectedMode === "rivals") {
      modeText = `Division Rivals - División ${currentDivision} → División ${targetDivision}`;
    } else {
      modeText = "Clasificatorio Fut Champions";
    }

    const message = language === "es"
      ? `👋🏼 ¡Hola! Me gustaría contratar el servicio de Boosting:\n\n${modeText}\nPrecio: ${formatPrice(price)}\n\n¡Gracias!`
      : `👋🏼 Hi! I would like to hire the Boosting service:\n\n${modeText}\nPrice: ${formatPrice(price)}\n\nThanks!`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Sección Hero SEO */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-16 text-white bg-zinc-900 bg-opacity-45">
        <h1 className="text-6xl font-bold text-center text-p1">
          Compra fifa coins seguras con entrega inmediata.
        </h1>
        <p className="text-xl font-semibold text-center mb-12 text-gray-300">
          Ofrecemos fifa coins rápidas, seguras y sin riesgos, con atención personalizada y más de ocho años de experiencia comprobada.
        </p>
        <a href="#buycoins" className="px-6 py-3 mb-5 text-white duration-75 ease-in-out rounded-full bg-p1 ring-1 ring-white hover:scale-105 sm:mb-0">
          Haz tu pedido ahora mismo.
        </a>
      </div>

      <div
      data-aos="fade-up"
      data-aos-delay="200"
      className="w-full flex flex-col items-center justify-start min-h-screen px-4 py-16 text-white bg-zinc-900 bg-opacity-45">
        {/* Título Principal */}
        <h2 className=" text-6xl font-bold text-center text-p1">
          {translate("BOOSTING", language)}
        </h2>
            <h2 className="text-xl font-semibold text-center mb-12 text-gray-300">
              {translate("RANGO", language)}
            </h2>
      {/* Contenedor Principal - Layout de 3 Columnas */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">
        
        {/* COLUMNA IZQUIERDA - Selector de Modo */}
        <div className="flex flex-col gap-3">

          
          <button
            onClick={() => setSelectedMode("futchampions")}
            className={`flex flex-row items-center bg-zinc-900 text-white px-5 py-4 rounded-xl gap-4 transition-all duration-300 ${
              selectedMode === "futchampions"
                ? "ring-2 ring-p1 bg-opacity-100 scale-105"
                : "bg-opacity-60 hover:bg-opacity-80 opacity-70"
            }`}
          >
            <img src="/logos/futchampions.webp" alt="Fut Champions" className="w-10 h-10" />
            <p className="font-semibold">Fut Champions</p>
          </button>

          <button
            onClick={() => setSelectedMode("rivals")}
            className={`flex flex-row items-center bg-zinc-900 text-white px-5 py-4 rounded-xl gap-4 transition-all duration-300 ${
              selectedMode === "rivals"
                ? "ring-2 ring-p1 bg-opacity-100 scale-105"
                : "bg-opacity-60 hover:bg-opacity-80 opacity-70"
            }`}
          >
            <img src="/logos/rivals.webp" alt="Division Rivals" className="w-10 h-10" />
            <p className="font-semibold">Division Rivals</p>
          </button>

          <button
            onClick={() => setSelectedMode("qualifier")}
            className={`flex flex-row items-center bg-zinc-900 text-white px-5 py-4 rounded-xl gap-4 transition-all duration-300 ${
              selectedMode === "qualifier"
                ? "ring-2 ring-p1 bg-opacity-100 scale-105"
                : "bg-opacity-60 hover:bg-opacity-80 opacity-70"
            }`}
          >
            <img src="/logos/futchampions.webp" alt="Qualifier" className="w-10 h-10" />
            <p className="font-semibold">Clasificatorio</p>
          </button>
        </div>

        {/* COLUMNA CENTRAL - Contenido Principal */}
        <div className="bg-zinc-900 bg-opacity-80 rounded-xl p-6 flex flex-col">
          {selectedMode === "futchampions" && (
            <div className="flex flex-col h-full">
              {/* Selector de Rango */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">
                  Selecciona el Rango
                </h3>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={decreaseRank}
                    disabled={selectedRank === "8"}
                    className="rotate-180 p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>
                  
                  <div className="text-center min-w-[200px]">
                    <div className="text-5xl font-bold text-p1 mb-1">
                      Rango {selectedRank}
                    </div>
                    <div className="text-2xl text-gray-300">
                      {futChampionsRanks.find(r => r.rank === selectedRank)?.wins} Victorias
                    </div>
                  </div>

                  <button
                    onClick={increaseRank}
                    disabled={selectedRank === "1"}
                    className="p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>
                </div>
              </div>

              {/* Recompensas */}
              <div className="flex-1 bg-zinc-800 bg-opacity-50 rounded-lg p-5 overflow-y-auto">
                <h4 className="text-xl font-bold text-p1 text-center mb-4">
                  Recompensas del Rango {selectedRank}
                </h4>
                <ul className="space-y-2.5">
                  {futChampionsRanks
                    .find((r) => r.rank === selectedRank)
                    ?.rewards.map((reward, index) => (
                      <li key={index} className="flex items-start text-gray-200">
                        <span className="text-p1 mr-3 mt-0.5">•</span>
                        <span className="leading-relaxed">{reward}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          {selectedMode === "rivals" && (
            <div className="flex flex-col justify-start h-full space-y-12">
              {/* División Actual */}
              <div>
                <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">
                  División Actual
                </h3>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={decreaseCurrentDivision}
                    disabled={currentDivision === "2"}
                    className="rotate-180 p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>

                  <div className="text-5xl font-bold text-p1 min-w-[200px] text-center">
                    División {currentDivision}
                  </div>

                  <button
                    onClick={increaseCurrentDivision}
                    disabled={currentDivision === "10"}
                    className="p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>
                </div>
              </div>

              {/* División Objetivo */}
              <div>
                <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">
                  División Objetivo
                </h3>
                <div className="flex items-center justify-center gap-8">
                  <button
                    onClick={decreaseTargetDivision}
                    disabled={targetDivision === "1"}
                    className="rotate-180 p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>

                  <div className="text-5xl font-bold text-p1 min-w-[200px] text-center">
                    División {targetDivision}
                  </div>

                  <button
                    onClick={increaseTargetDivision}
                    disabled={targetDivision === "9"}
                    className="p-3 transition-all hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <RightArrow/>
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedMode === "qualifier" && (
            <div className="flex flex-col items-center justify-start h-full text-center">
              <div className="mb-4">
                <img src="/logos/futchampions.webp" alt="Qualifier" className="w-24 h-24 mx-auto mb-4 opacity-80" />
              </div>
              <h3 className="text-4xl font-bold text-p1 mb-3">
                Clasificatorio Fut Champions
              </h3>
              <p className="text-xl text-gray-300">Precio Fijo</p>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA - Precio y Botón */}
        <div className="flex flex-col gap-4">
          {/* Precio */}
          <div className="bg-zinc-900 bg-opacity-80 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Precio Total</p>
            <div className="text-4xl font-bold text-p1 mb-1">
              { getPrice() > 0 ? formatPrice(getPrice()) : language === "es" ? "NO DISPONIBLE" : "NOT AVAILABLE" }
            </div>
          </div>

          {/* Botón de WhatsApp */}
          {/* si esta disabled, no hover */}
          <button
            onClick={openWhatsApp}
            disabled={getPrice() === 0}

            className="bg-green-600 disabled:opacity-40 disabled:hover:bg-green-600 disabled:hover:scale-100 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 text-lg shadow-lg"
          >
            {language === "es" ? "Comprar" : "Buy" }
          </button>

          {/* Info adicional */}
          <div className="bg-zinc-900 bg-opacity-60 rounded-xl p-4 text-sm text-gray-400">
            <p className="mb-2">✓ Servicio profesional</p>
            <p className="mb-2">✓ Seguridad garantizada</p>
            <p>✓ Entrega rápida</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}