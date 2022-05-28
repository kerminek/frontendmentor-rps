import { useGameContext } from "../contexts/GameContext";
import Logo from "../images/logo.svg";

const ScoreBar = () => {
  const { score, scoreSet } = useGameContext();

  return (
    <div className="w-full flex justify-between items-center p-3 pl-5 border-[3px] rounded-lg border-header-outline max-w-3xl lg:h-52 lg:py-0">
      <img src={Logo} alt="logo" className="h-14 lg:h-24" />
      <div
        className="flex flex-col bg-white py-2 px-6 rounded-md text-center cursor-pointer pointer-events-auto lg:py-4 lg:px-10"
        onClick={() => {
          localStorage.setItem("RPS_Save", "0");
          scoreSet((prev: any) => ({ number: 0, string: prev.string }));
        }}
      >
        <p className="tracking-widest text-xs text-score-text lg:text-sm">SCORE</p>
        <span className="text-5xl text-dark-text">{score.number}</span>
      </div>
    </div>
  );
};

export default ScoreBar;
