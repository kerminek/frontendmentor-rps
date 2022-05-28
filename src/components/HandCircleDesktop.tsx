import Paper from "../images/icon-paper.svg";
import Scissors from "../images/icon-scissors.svg";
import Rock from "../images/icon-rock.svg";
import { useGameContext } from "../contexts/GameContext";
import { useSpring, animated, config } from "react-spring";
import { SelectionNumber } from "../contexts/GameContext";

interface KeyNumberValueString {
  [key: number]: string;
}

const HandCircle = ({ pos, item, bot }: { pos: Exclude<SelectionNumber, null>; item: number; bot: any }) => {
  const { selected, selectedSet } = useGameContext();

  const positions: any = {
    1: {
      x: 0,
      y: -70,
    },
    2: {
      x: 290,
      y: -70,
    },
    3: {
      x: 145,
      y: 140,
    },
    4: {
      x: -10,
      y: 0,
    },
  };

  const colors: KeyNumberValueString = {
    1: " from-paper-from to-paper-to border-[#3929e9] ",
    2: " from-scissors-from to-scissors-to border-[#c26e00] ",
    3: " from-rock-from to-rock-to border-[#9d0000] ",
  };

  const images: KeyNumberValueString = {
    1: Paper,
    2: Scissors,
    3: Rock,
  };

  const animStyles = useSpring({
    from: {
      scale: 0.5,
    },
    to: {
      x: !bot && selected === pos ? 0 : positions[pos].x,
      y: !bot && selected === pos ? 0 : positions[pos].y,
      scale: 1,
    },
    config: config.wobbly,
  });

  return (
    <animated.div
      style={animStyles}
      className={`bg-gradient-to-t flex justify-center items-center h-48 w-48 rounded-full border-b-[5px] select-none absolute 
      ${!bot && selected && selected !== pos && "hidden"}${colors[item]}`}
    >
      <div
        className={`bg-white h-36 w-36 rounded-full flex justify-center items-center border-t-[5px] border-gray-300 ${
          !bot && "cursor-pointer active:border-none active:scale-95 "
        } duration-75 ease-linear ${selected && "pointer-events-none"} p-7`}
        onClick={() => !bot && selectedSet(pos)}
      >
        <img src={images[item]} alt="" className="pointer-events-none h-full object-fill" />
      </div>
    </animated.div>
  );
};

export default HandCircle;
