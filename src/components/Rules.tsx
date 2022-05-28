import { useSpring, animated, config } from "react-spring";
import { useGameContext } from "../contexts/GameContext";
import IconClose from "../images/icon-close.svg";
import ImageRules from "../images/image-rules.svg";

const Rules = () => {
  const { rulesOpen, rulesOpenSet } = useGameContext();

  const animDivStyles = useSpring({
    from: {
      y: "100vh",
    },
    to: {
      y: rulesOpen ? "0vh" : "100vh",
    },
    delay: !rulesOpen ? 80 : 100,
  });

  const animRulesParagraph = useSpring({
    from: {
      y: -500,
    },
    to: {
      y: rulesOpen ? 0 : -500,
    },
    delay: rulesOpen ? 300 : 0,
    config: config.gentle,
  });

  return (
    <animated.div
      style={animDivStyles}
      className="w-full h-full bg-white absolute overflow-hidden z-[99] top-0 left-0 flex justify-center items-center"
    >
      <div className="flex flex-col justify-evenly items-center h-3/4 gap-20">
        <animated.p style={animRulesParagraph} className="text-3xl text-dark-text">
          RULES
        </animated.p>
        <div>
          <img src={ImageRules} alt="" className="w-full object-contain" />
        </div>
        <p className="text-xs text-gray-400 tracking-widest">To reset score just click on it</p>
        <div onClick={() => rulesOpenSet(false)} className="cursor-pointer mb-6">
          <img src={IconClose} alt="" className="object-cover mx-auto h-6 w-6" />
        </div>
      </div>
    </animated.div>
  );
};

export default Rules;
