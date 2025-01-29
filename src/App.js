import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import MainBanner from './MainBanner';
import BuyCoins from './BuyCoins';
function App() {
  return (
    <div className="max-w-screen min-h-screen bg-zinc-800 flex flex-col items-start justify-start">
      <Nav />
      <MainBanner/>
      <BuyCoins/>
    </div>
  );
}

export default App;
