import { useGameContext } from "../contexts/GameContext";
import Triangle from "../images/bg-triangle.svg";
import HandCircle from "./HandCircleDesktop";
import { animated, useSpring, config } from "react-spring";
import { useState } from "react";

const DesktopGameContainer = () => {
  const { selected, botResponse, playAgain, score, againDisplay, againDisplaySet } = useGameContext();
  const [showPick, showPickSet] = useState(false);

  const chooseTxtAnim = useSpring({
    from: {
      scale: selected ? 0 : 1,
      opacity: 0,
    },
    to: {
      scale: selected ? 1 : 0,
      opacity: 1,
    },
    delay: 400,
    config: config.wobbly,
    immediate: !selected,
    onStart: () => showPickSet(true),
  });

  const verdictAnim = useSpring({
    from: {
      scale: botResponse ? 0 : 1,
      opacity: 0,
      display: "none",
    },
    to: {
      scale: botResponse ? 1 : 0,
      opacity: 1,
      display: "block",
    },
  });

  const { x } = useSpring({
    from: { x: 0 },
    to: { x: againDisplay ? 1 : 0 },
    config: config.wobbly,
  });

  const handlePlayAgain = () => {
    againDisplaySet(false);
    showPickSet(false);
    const timer = setInterval(() => {
      playAgain();
      clearInterval(timer);
    }, 1200);
  };
  // DESKTOP AND MOBILE VERSION EACH OTHER HAVE DIFFERENT HTML STRUCTURE,
  //  IT CAN BE UNIFIED, BUT I DON'T WANNA SPEND MORE TIME ON THIS PROJECT.
  return (
    <div className="h-full w-full pt-32 hidden flex-col items-center mb-16 lg:flex">
      <div className="w-[600px] flex justify-center relative">
        {!selected && <img src={Triangle} alt="triangle" className="absolute w-3/5 z-0" />}
      </div>

      <div className="w-full absolute text-white tracking-widest whitespace-nowrap">
        <div className="flex justify-center gap-32 w-full">
          <animated.div
            style={{ x: x.to([0, 0.5, 1], [0, -100, -200]) }}
            className={`h-44 w-44 rounded-full${selected && " bg-black/10 "}`}
          >
            <HandCircle pos={1} item={1} bot={false} />
            <HandCircle pos={2} item={2} bot={false} />
            <HandCircle pos={3} item={3} bot={false} />
            {selected && (
              // without requirement div has dimensions and is blocking part of the "rock" option / z-index does not work
              <div className="translate-y-52 translate-x-12">
                <animated.p style={chooseTxtAnim}>{showPick && "YOU PICKED"}</animated.p>
              </div>
            )}
          </animated.div>

          {againDisplay && (
            <animated.div style={verdictAnim} className="absolute">
              <p className="text-6xl text-white font-[700] mb-6">YOU {score.string}</p>
              <button
                className="w-full bg-white tracking-widest text-lg py-3 rounded-xl text-black"
                onClick={handlePlayAgain}
              >
                PLAY AGAIN
              </button>
            </animated.div>
          )}

          <animated.div
            style={{ x: x.to([0, 1], [0, 200]) }}
            className={`h-44 w-44 rounded-full${selected && " bg-black/10 "}`}
          >
            {botResponse && <HandCircle pos={4} item={botResponse} bot={true} />}
            <div className="translate-y-52 translate-x-9">
              <animated.p style={chooseTxtAnim}>{showPick && "HOUSE PICKED"}</animated.p>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default DesktopGameContainer;
