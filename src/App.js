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
function Layout({ children }) {
  return (
    <div className="max-w-screen overflow-hidden min-h-screen bg-black flex flex-col items-start justify-start">
      <Nav />
      <div className="flex-grow w-full">{children}</div>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <MainBanner/>
      <BuyCoins/>
      <Payment />
      <DataBlock />
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
