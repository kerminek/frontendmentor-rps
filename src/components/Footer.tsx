import { useGameContext } from "../contexts/GameContext";

import { animated, useSpring, config } from "react-spring";

const Footer = () => {
  const { selected, rulesOpen, rulesOpenSet } = useGameContext();

  const animButtonStyles = useSpring({
    from: {
      y: 0,
    },
    to: {
      y: rulesOpen ? 600 : 0,
    },
    delay: !rulesOpen ? 300 : 0,
    config: config.gentle,
  });

  return (
    <div className="h-full flex justify-center flex-col items-center relative z-50 lg:self-end lg:justify-end">
      {!selected && (
        <animated.div
          style={animButtonStyles}
          className="border-2 border-header-outline text-white py-2 px-10 rounded-xl cursor-pointer tracking-[3px] md:self-end hover:bg-white hover:text-dark-text hover:border-none"
          onClick={() => rulesOpenSet(!rulesOpen)}
        >
          RULES
        </animated.div>
      )}
    </div>
  );
};

export default Footer;
