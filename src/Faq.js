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
    <div className="w-full sm:w-3/4 text-white sm:p-12 p-5 mb-12">
      <h1 className='mb-10 font-semibold text-left text-3xl'>{translate('faqTitle', language)}</h1>
      <section className='w-full min-h-full flex flex-col sm:flex-row items-start justify-center gap-5'>
        <div className='w-full h-full'>
          {faqs.slice(0, visibleCount).map((faq, index) => (
            <div
              key={index}
              className='p-4 my-2 rounded-lg cursor-pointer flex flex-col items-start p1-gradient'
              onClick={() => toggleFaq(index)}
            >
              <div className="font-extrabold text-center w-full">
                {translate('faq' + faq.key, language)}
              </div>
              {faq.isOpen && <div className="mt-2 text-center w-full">{translate(`answer${faq.key}`, language)}</div>}
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-start gap-4 mt-1">
        {visibleCount > 6 && (
          <button
            onClick={showLess}
            className="px-4 py-2 text-white underline rounded hover:scale-105 transition ease-in cursor-pointer duration-75"
          >
            {translate('showLess', language)}
          </button>
        )}
        {visibleCount < faqs.length && (
          <button
            onClick={showMore}
            className="px-4 py-2 text-white underline rounded hover:scale-105 transition ease-in cursor-pointer duration-75"
          >
           {translate('showMore', language)}
          </button>
        )}
      </div>
    </div>
  );
};

export default Faq;