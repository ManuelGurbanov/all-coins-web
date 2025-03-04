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
  handleBarClick
}) {
  const language = useLanguage().language;
  const [isDragging, setIsDragging] = useState(false);

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

  const [bonusPercentage, setBonusPercentage] = useState(0);
  const [minCoinsForBonus, setMinCoinsForBonus] = useState(0);

  useEffect(() => {
    const fetchBonusConfig = async () => {
      const docRef = doc(db, "discounts", "global");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBonusPercentage(data.discountPercentage || 0);
        setMinCoinsForBonus(data.minCoinsForDiscount || 0);
      }
    };

    fetchBonusConfig();
  }, []);

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
    if (bonusPercentage === 0) return null;
    if (price >= minCoinsForBonus) {
      return (Math.floor((price * bonusPercentage) / 100) / 1000) + "K";
    }
    return translate("LLEVATE2", language) + " " + minCoinsForBonus / 1000 + "K " + translate("LLEVATE3", language);
  };
  

  const minPrice = 0;
  const maxPrice = 2000000;
  const calculatedProgress = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  // Posiciones para los marcadores:
  const ratio250 = ((500000 - minPrice) / (maxPrice - minPrice)) * 100; // ~7.89%
  const ratio1000 = ((1000000 - minPrice) / (maxPrice - minPrice)) * 100; // ~47.37%

  return (
    <div className="w-full px-4">
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
        <span className="text-xl font-bold text-p1">{calculatePriceForCountry().toLocaleString()}</span>
      </div>

      {/* Barra de Precios */}
      <div className="relative flex items-center justify-center w-full mt-4 sm:mt-4">
        <button onClick={decreasePrice} className="px-4 py-2 mr-4 text-white rotate-180">
          <RightArrow/>
        </button>
        
        <div 
          className="relative flex-1 h-4 bg-gray-600 rounded-full cursor-pointer" 
          ref={barRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart} 
        >
          {/* Progreso sin transición */}
          <div
            className="h-full rounded-full bg-p1"
            style={{ width: `${calculatedProgress}%` }}
          />

          {/* Círculo en la punta del progreso sin transición */}
          <div 
            className="absolute transform -translate-y-1/2 bg-white rounded-full top-1/2"
            style={{
              width: '20px',
              height: '20px',
              left: `calc(${calculatedProgress}% - 10px)`
            }}
          />

          {/* Marcador para 250K */}
          {/* <div 
            className="absolute flex items-center justify-center gap-1 px-2 py-1 text-black bg-yellow-400 cursor-default -top-10 rounded-xl"
            style={{
              left: `calc(${ratio250}% - 30px)`
            }}
          >
            <div className="text-sm">+25</div> <img src='coin.webp' className='w-4'></img>
          </div>

          {/* Marcador para 1M 
          <div 
            className="absolute flex items-center justify-center gap-1 px-2 py-1 text-black bg-yellow-400 cursor-default -top-10 rounded-xl"
            style={{
              left: `calc(${ratio1000}% - 30px)`
            }}
          >
            <div className="text-sm">+50K</div> <img src='coin.webp' className='w-4'></img>
          </div> */}

          {/* Marcadores existentes (opcional, ajustalos si ya no se necesitan) */}
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

      <div className="flex flex-col items-center justify-center w-full gap-2 mt-8">
        <button
          onClick={openWhatsApp}
          className="px-6 py-3 mb-5 text-white duration-75 ease-in-out rounded-full bg-p1 ring-1 ring-white hover:scale-105 sm:mb-0"
        >
          {translate("buy", language)} <strong>{calculatePriceForCountry().toLocaleString()}</strong>
        </button>
      </div>
    </div>
  );
}
