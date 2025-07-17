import { translate } from './Translations';
import { useLanguage } from './LanguageContext';
import React, { useState, useEffect } from 'react';

import { db, doc, getDoc } from './firebaseConfig';
import GiftLogo from './GiftLogo';

import RightArrow from './RightArrow';

export default function BuyBox({
  formatPrice, 
  price, 
  calculatePriceForCountry, 
  increasePrice, 
  decreasePrice, 
  setPrice, 
  openWhatsApp, 
  barRef, 
  handleBarClick,
  selectedPlatform
}) {
  const language = useLanguage().language;
  const [isDragging, setIsDragging] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isValidCode, setIsValidCode] = useState(false);

  // Diccionario de códigos de descuento
  const discountCodes = {
    "CHIGRE10": 10,
    "SAVE15": 15,
    "WELCOME20": 20,
    "MEGA25": 25
  };

  const updatePriceFromPosition = (clientX) => {
    if (!barRef.current) return;
    const barRect = barRef.current.getBoundingClientRect();
    let relativeX = clientX - barRect.left;
    relativeX = Math.max(0, Math.min(relativeX, barRect.width));

    const minPrice = 100000;
    const maxPrice = 2000000;
    const ratio = relativeX / barRect.width;
    let newPrice = minPrice + ratio * (maxPrice - minPrice);
    newPrice = Math.round(newPrice / 50000) * 50000;

    setPrice(newPrice);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePriceFromPosition(e.clientX);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (handleBarClick) {
      handleBarClick(e);
    }
    updatePriceFromPosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      updatePriceFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      updatePriceFromPosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const [bonusPercentage, setBonusPercentage] = useState({ PC: 0, PSXB: 0 });
  const [minCoinsForBonus, setMinCoinsForBonus] = useState(0);

  useEffect(() => {
    const fetchBonusConfig = async () => {
        const docRef = doc(db, "discounts", "global");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();

            setBonusPercentage({
                PC: data.PC || 0,
                PSXB: data.PSXB || 0,
            });

            setMinCoinsForBonus(data.minCoinsForDiscount || 0);
        }
    };

    fetchBonusConfig();
}, []);

  // Manejar el código de descuento
  const handleDiscountCode = (code) => {
    setDiscountCode(code);
    const upperCode = code.toUpperCase();
    
    if (discountCodes[upperCode]) {
      setAppliedDiscount(discountCodes[upperCode]);
      setIsValidCode(true);
    } else {
      setAppliedDiscount(0);
      setIsValidCode(false);
    }
  };

  // Calcular precio con descuento
  const calculateDiscountedPrice = () => {
    if (appliedDiscount > 0) {
      const originalPrice = calculatePriceForCountry();
      // Extraer el número del precio
      const priceNumber = parseFloat(originalPrice.replace(/[^0-9,.-]/g, '').replace(',', '.'));
      const discountedPrice = priceNumber * (1 - appliedDiscount / 100);
      
      if (["CLP", "COP", "MXN", "ARS"].includes(originalPrice.split(' ')[1])) {
        return "$" + Math.floor(discountedPrice).toLocaleString("es-ES");
      } else if (originalPrice.includes("EUR")) {
        return "€" + discountedPrice.toFixed(2);
      } else {
        return discountedPrice.toFixed(2);
      }
    }
    return calculatePriceForCountry();
  };

  // Función modificada para WhatsApp
  const handleOpenWhatsApp = () => {
    const originalPrice = calculatePriceForCountry();
    let message = "";
    
    if (appliedDiscount > 0) {
      const discountedPrice = calculateDiscountedPrice();
      const currency = originalPrice.split(' ')[1] || '';
      
      message = language === "es" 
        ? `👋🏼 Hola! Estoy interesado en ${formatPrice(price)} para ${selectedPlatform === "PSXB" ? "PS/XB" : "PC"}.\n💰 Precio original: ${originalPrice}\n🎟️ Código de descuento: ${discountCode.toUpperCase()} (${appliedDiscount}% OFF)\n✅ Precio final: ${discountedPrice} ${currency}\nGracias!`
        : `👋🏼 Hi! I'm interested in ${formatPrice(price)} for ${selectedPlatform === "PSXB" ? "PS/XB" : "PC"} platform.\n💰 Original price: ${originalPrice}\n🎟️ Discount code: ${discountCode.toUpperCase()} (${appliedDiscount}% OFF)\n✅ Final price: ${discountedPrice} ${currency}\nThanks!`;
    } else {
      message = language === "es" 
        ? `👋🏼 Hola! Estoy interesado en ${formatPrice(price)} para ${selectedPlatform === "PSXB" ? "PS/XB" : "PC"}. Precio: ${originalPrice}. Gracias!`
        : `👋🏼 Hi! I'm interested in ${formatPrice(price)} for ${selectedPlatform === "PSXB" ? "PS/XB" : "PC"} platform. Price: ${originalPrice}. Thanks!`;
    }
    
    // Llamar a la función openWhatsApp del componente padre con el mensaje personalizado
    const phoneNumber = "34644847922";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const calculateBonusCoins = () => {
    if (!selectedPlatform) {
        return null;
    }

    const platformBonusPercentage = bonusPercentage[selectedPlatform] || 0;

    if (price >= minCoinsForBonus && platformBonusPercentage > 0) {
        const bonus = Math.floor((price * platformBonusPercentage) / 100) / 1000;
        return bonus === 0 ? null : bonus + "K";
    }

    if (minCoinsForBonus > 0 && platformBonusPercentage > 0) {
        return translate("LLEVATE2", language) + " " + (minCoinsForBonus / 1000) + "K " + translate("LLEVATE3", language);
    }

    return null;
};

  const minPrice = 0;
  const maxPrice = 2000000;
  const calculatedProgress = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  // Posiciones para los marcadores:
  const ratio250 = ((500000 - minPrice) / (maxPrice - minPrice)) * 100; // ~7.89%
  const ratio1000 = ((1000000 - minPrice) / (maxPrice - minPrice)) * 100; // ~47.37%

  return (
    <div className="w-full px-4 mb-8">
      <div className="flex flex-col items-center justify-center w-full sm:mt-2"> 
        <span className="flex items-center justify-center gap-4 text-6xl font-bold text-white sm:mb-0">
          {formatPrice(price)} <img src='coin.webp' className='w-12'></img>
        </span>
        <span className="text-xl font-bold text-yellow-400">
          {calculateBonusCoins() != null ? (
            <div className='flex items-center justify-center text-2xl'>
              ¡{calculateBonusCoins()} <GiftLogo/> !
            </div>
          ) : null}
        </span>
        
        {/* Mostrar precio con o sin descuento */}
        <div className="flex items-center gap-2 text-xl font-bold">
          {appliedDiscount > 0 ? (
            <>
              <span className="text-red-500 line-through">
                {calculatePriceForCountry().toLocaleString()}
              </span>
              <span className="text-green-500">
                {calculateDiscountedPrice()} {calculatePriceForCountry().split(' ')[1]}
              </span>
              <span className="text-yellow-400 text-sm">
                (-{appliedDiscount}%)
              </span>
            </>
          ) : (
            <span className="text-p1">{calculatePriceForCountry().toLocaleString()}</span>
          )}
        </div>
      </div>

      {/* Barra de Precios */}
      <div className="relative flex items-center justify-center w-full mt-4 sm:mt-4">
        <button onClick={decreasePrice} className="px-4 py-2 mr-4 text-white rotate-180">
          <RightArrow/>
        </button>
        
        <div 
          className="relative flex-1 h-4 bg-gray-600 rounded-full cursor-pointer" 
          ref={barRef}
          
        >
          <div  className='absolute w-full h-full top-0 left-0 cursor-pointer' onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>

          </div>
          <div
            className="h-full rounded-full bg-p1"
            style={{ width: `${calculatedProgress}%` }}
          />

          <div 
            className="absolute transform -translate-y-1/2 bg-white rounded-full top-1/2"
            style={{
              width: '20px',
              height: '20px',
              left: `calc(${calculatedProgress}% - 10px)`,
              pointerEvents: 'none'
            }}
          />

        <div className="absolute z-50 flex flex-col items-center -right-2 -bottom-8 sm:-bottom-11">
            <div className="w-[2px] h-7 bg-white mb-1"></div>
            <button 
              className="text-[10px] rounded-3xl p-1 text-white" 
              onClick={() => setPrice(2000000)}
            >
              2M
            </button>
          </div>
          
          <div className="absolute left-[50%] -translate-x-1/2 -bottom-8 sm:-bottom-11 flex flex-col items-center z-50">
            <div className="w-[2px] h-7 bg-white mb-1"></div>
            <button 
              className="text-[10px] rounded-3xl p-1 text-white" 
              onClick={() => setPrice(1000000)}
            >
              1M
            </button>
          </div>

          <div className="absolute left-[25%] -translate-x-1/2 -bottom-8 sm:-bottom-11 flex flex-col items-center z-50">
            <div className="w-[2px] h-7 bg-white mb-1"></div>
            <button 
              className="text-[10px] rounded-3xl p-1 text-white" 
              onClick={() => setPrice(500000)}
            >
              500K
            </button>
          </div>
        </div>

        <button onClick={increasePrice} className="px-4 py-2 ml-4 text-white">
          <RightArrow/>
        </button>
      </div>

      {/* Input para código de descuento */}
      {/* <div className="flex flex-col items-center justify-center w-full gap-2 mt-6">
        <input
          type="text"
          placeholder={language === "es" ? "Código de descuento" : "Discount code"}
          value={discountCode}
          onChange={(e) => handleDiscountCode(e.target.value)}
          className={`px-4 py-2 rounded-lg text-black text-center border-2 ${
            discountCode && isValidCode 
              ? 'border-green-500 bg-green-50' 
              : discountCode && !isValidCode 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-300'
          }`}
        />
        {discountCode && isValidCode && (
          <span className="text-green-400 text-sm">
            ✅ {language === "es" ? "Código válido" : "Valid code"} - {appliedDiscount}% OFF
          </span>
        )}
        {discountCode && !isValidCode && discountCode.length > 0 && (
          <span className="text-red-400 text-sm">
            ❌ {language === "es" ? "Código inválido" : "Invalid code"}
          </span>
        )}
      </div> */}

      <div className="flex flex-col items-center justify-center w-full gap-2 mt-6">
        <button
          onClick={handleOpenWhatsApp}
          className="px-6 py-3 mb-5 text-white duration-75 ease-in-out rounded-full bg-p1 ring-1 ring-white hover:scale-105 sm:mb-0"
        >
          {translate("buy", language)} <strong>
            {appliedDiscount > 0 
              ? `${calculateDiscountedPrice()} ${calculatePriceForCountry().split(' ')[1]}`
              : calculatePriceForCountry().toLocaleString()
            }
          </strong>
        </button>
      </div>
    </div>
  );
}