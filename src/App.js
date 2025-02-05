import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import MainBanner from './MainBanner';
import BuyCoins from './BuyCoins';
import Payment from './Payment';
import Footer from './Footer';
function App() {
  return (
    <div className="max-w-screen overflow-hidden min-h-screen bg-white flex flex-col items-start justify-start">
      <Nav />
      <MainBanner/>
      <BuyCoins/>
      <Payment/>
      <Footer/>
    </div>
  );
}

export default App;
