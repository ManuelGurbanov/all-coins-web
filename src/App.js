import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import MainBanner from './MainBanner';
function App() {
  return (
    <div className="w-screen min-h-screen bg-zinc-800 flex flex-col items-start justify-center">
      <Nav />
      <MainBanner />
    </div>
  );
}

export default App;
