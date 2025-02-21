import { translate } from './Translations';
import { useLanguage } from './LanguageContext';
import React, { useState, useEffect } from 'react';

export default function BuyBox({
  formatPrice, 
  price, 
  calculatePriceForCountry, 
  calculateBonusCoins, 
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

  // Rango de precios
  const minPrice = 0;
  const maxPrice = 2000000;
  const calculatedProgress = ((price - minPrice) / (maxPrice - minPrice)) * 100;

  // Posiciones para los marcadores:
  const ratio250 = ((500000 - minPrice) / (maxPrice - minPrice)) * 100; // ~7.89%
  const ratio1000 = ((1000000 - minPrice) / (maxPrice - minPrice)) * 100; // ~47.37%

  return (
    <div className="w-full px-4">
      <div className="flex items-center flex-col justify-center sm:mt-2 w-full"> 
        <span className="text-white text-6xl font-bold sm:mb-0 gap-4 flex items-center justify-center">
          {formatPrice(price)} <img src='coin.webp' className='w-12'></img>
        </span>
        <span className="text-xl font-bold text-yellow-400 sm:mb-2 mb-4">
          {calculateBonusCoins() != null ? (
            <h1>
              ¡{calculateBonusCoins()} {translate("REGALO", language)}
            </h1>
          ) : (
            <h1 className="text-white w-full text-center">
              {translate("LLEVATE2", language)} 
              <span className="text-p1 font-bold"> +500K </span> 
              {translate("BONUS", language)}  
              <span className="text-p1 font-bold"> BONUS </span>
            </h1>
          )}
        </span>
      </div>

      {/* Barra de Precios */}
      <div className="w-full flex items-center justify-center sm:mt-4 mt-4 relative">
        <button onClick={decreasePrice} className="px-4 py-2 text-white mr-4">&lt;</button>
        
        <div 
          className="flex-1 h-4 bg-gray-600 rounded-full relative cursor-pointer" 
          ref={barRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart} 
        >
          {/* Progreso sin transición */}
          <div
            className="h-full bg-p1 rounded-full"
            style={{ width: `${calculatedProgress}%` }}
          />

          {/* Círculo en la punta del progreso sin transición */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full"
            style={{
              width: '20px',
              height: '20px',
              left: `calc(${calculatedProgress}% - 10px)`
            }}
          />

          {/* Marcador para 250K */}
          <div 
            className="absolute -top-10 bg-yellow-400 px-2 py-1 text-black rounded-xl cursor-default flex items-center justify-center gap-1"
            style={{
              left: `calc(${ratio250}% - 30px)`
            }}
          >
            <div className="text-sm">+25</div> <img src='coin.webp' className='w-4'></img>
          </div>

          {/* Marcador para 1M */}
          <div 
            className="absolute -top-10 bg-yellow-400 px-2 py-1 text-black rounded-xl cursor-default flex items-center justify-center gap-1"
            style={{
              left: `calc(${ratio1000}% - 30px)`
            }}
          >
            <div className="text-sm">+50K</div> <img src='coin.webp' className='w-4'></img>
          </div>

          {/* Marcadores existentes (opcional, ajustalos si ya no se necesitan) */}
          <div className="absolute -right-2 -bottom-8 sm:-bottom-11 flex flex-col items-center z-50">
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
        
        <button onClick={increasePrice} className="px-4 py-2 text-white ml-4">&gt;</button>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center w-full gap-2">
        <button
          onClick={openWhatsApp}
          className="px-6 py-3 bg-p1 text-white ring-1 ring-white rounded-full hover:scale-105 duration-75 ease-in-out sm:mb-0 mb-5"
        >
          {translate("buy", language)} <strong>{calculatePriceForCountry().toLocaleString()}</strong>
        </button>
      </div>
    </div>
  );
}
