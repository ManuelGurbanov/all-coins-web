import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Nav from "./Nav";
import MainBanner from "./MainBanner";
import BuyCoins from "./BuyCoins";
import Payment from "./Payment";
import Footer from "./Footer";
import AdminPanel from "./AdminPanel";
import DataBlock from "./DataBlock";
import Boosting from "./Boosting";

import { LanguageProvider } from "./LanguageContext"; 

import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const openWhatsApp = () => {
  const url = `https://wa.me/34671704084`;
  window.open(url, "_blank");
};

function Layout({ children }) {
  return (
    <LanguageProvider>
      <div className="max-w-screen overflow-hidden min-h-screen bg-black flex flex-col items-start justify-start">
        <Nav/>
        <div className="flex-grow w-full">{children}</div>
        <Footer />
      </div>

      <button className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full w-16 h-16 p-3 hover:scale-110 transition-all duration-75 ease-in-out hover:ring-1 ring-white" onClick={openWhatsApp}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#ffffff"></path> </g></svg>
      </button>

    </LanguageProvider>
  );
}

function Home() {
  return (
    <>
      <MainBanner/>
      <BuyCoins/>
      <div className="flex flex-col items-center justify-start w-full sm:mt-12 stadium-bg">
      <Payment />
      <DataBlock />
      <Boosting/>
      </div>
    </>
  );
}

function AboutUs() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white">
      <h1 className="text-4xl font-bold" data-aos="fade-up">Sobre Nosotros</h1>
    </div>
  );
}

function SellCoins() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white">
      <h1 className="text-4xl font-bold">Vendé tus Monedas</h1>
    </div>
  );
}

function App() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/sobre-nosotros" element={<Layout><AboutUs /></Layout>} />
          <Route path="/vender-monedas" element={<Layout><SellCoins /></Layout>} />
          <Route path="/admin-panel" element={<Layout><AdminPanel /></Layout>} />
        </Routes>
      </Router>
  );
}

export default App;
