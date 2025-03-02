import React, { useState } from 'react';
import { translate } from './Translations';

import { useLanguage } from './LanguageContext';

const Faq = () => {

  const language = useLanguage().language;
  const [faqs, setFaqs] = useState([
    {
      key: '1',
      isOpen: true,
    },
    {
      key: '2',
      isOpen: false,
    },
    {
      key: '3',
      isOpen: false,
    },
    {
      key: '4',
      isOpen: false,
    },
    {
      key: '5',
      isOpen: false,
    },
    {
      key: '6',
      isOpen: false,
    },
    {
      key: '7',
      isOpen: false,
    },
    {
      key: '8',
      isOpen: false,
    },
    {
      key: '9',
      isOpen: false,
    },
    {
      key: '10',
      isOpen: false,
    },
    {
      key: '11',
      isOpen: false,
    },
    {
      key: '12',
      isOpen: false,
    }
  ]);

  const [visibleCount, setVisibleCount] = useState(5);

  const toggleFaq = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.isOpen = !faq.isOpen;
      } else {
        faq.isOpen = false;
      }
      return faq;
    }));
  };

  const showMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 6, faqs.length));
  };

  const showLess = () => {
    setVisibleCount(prevCount => Math.max(prevCount - 6, 6));
  };

  return (
    <div className="w-full p-5 mb-12 text-white sm:w-3/4 sm:p-12" id='faq'>
      <h1 className='mb-10 text-3xl font-semibold text-left'>{translate('faqTitle', language)}</h1>
      <section className='flex flex-col items-start justify-center w-full min-h-full gap-5 sm:flex-row'>
        <div className='w-full h-full'>
          {faqs.slice(0, visibleCount).map((faq, index) => (
            <div
              key={index}
              className='flex flex-col items-start p-4 my-2 rounded-lg cursor-pointer p1-gradient'
              onClick={() => toggleFaq(index)}
            >
              <div className="w-full font-extrabold text-center">
                {translate('faq' + faq.key, language)}
              </div>
              {faq.isOpen && <div className="w-full mt-2 text-center">{translate(`answer${faq.key}`, language)}</div>}
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-start gap-4 mt-1">
        {visibleCount > 6 && (
          <button
            onClick={showLess}
            className="px-4 py-2 text-white underline transition duration-75 ease-in rounded cursor-pointer hover:scale-105"
          >
            {translate('showLess', language)}
          </button>
        )}
        {visibleCount < faqs.length && (
          <button
            onClick={showMore}
            className="px-4 py-2 text-white underline transition duration-75 ease-in rounded cursor-pointer hover:scale-105"
          >
           {translate('showMore', language)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Faq;