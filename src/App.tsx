import Footer from "./components/Footer";
import Game from "./components/Game";
import Rules from "./components/Rules";
import ScoreBar from "./components/ScoreBar";

function App() {
  return (
    <div className="h-full bg-gradient-to-b from-background-from to-background-to">
      <div className="w-full h-full px-6 pt-8 flex flex-col items-center pb-10 md:pb-8 select-none overflow-hidden relative">
        <ScoreBar />
        <Game />
        <Footer />
        <Rules />
      </div>
    </div>
  );
}

export default App;
