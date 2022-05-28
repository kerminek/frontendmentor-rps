import { useGameContext } from "../contexts/GameContext";
import Triangle from "../images/bg-triangle.svg";
import HandCircle from "./HandCircleMobile";
import { animated, useSpring, config } from "react-spring";

const MobileGameContainer = () => {
  const { selected, botResponse, playAgain, score } = useGameContext();

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
  });

  const verdictAnim = useSpring({
    from: {
      scale: botResponse ? 0 : 1,
      opacity: 0,
    },
    to: {
      scale: botResponse ? 1 : 0,
      opacity: 1,
    },
    delay: 600,
  });
  // DESKTOP AND MOBILE VERSION EACH OTHER HAVE DIFFERENT HTML STRUCTURE,
  //  IT CAN BE UNIFIED, BUT I DON'T WANNA SPEND MORE TIME ON THIS PROJECT.
  return (
    <div className="h-full w-full pt-32 flex flex-col items-center mb-16 lg:hidden">
      <div className="w-[327px] flex justify-center relative">
        {!selected && <img src={Triangle} alt="triangle" className="absolute w-3/5 z-0" />}
        <div className="z-10 relative h-52 w-full">
          <HandCircle pos={1} item={1} bot={false} />
          <HandCircle pos={2} item={2} bot={false} />
          <HandCircle pos={3} item={3} bot={false} />
        </div>
      </div>
      {selected && (
        <div className="w-[327px] absolute text-white tracking-widest whitespace-nowrap">
          <div className="flex justify-evenly gap-20 w-full">
            <div className="h-24 w-24 bg-black/10 rounded-full">
              <div className="translate-y-32 translate-x-1">
                <animated.p style={chooseTxtAnim}>YOU PICKED</animated.p>
              </div>
            </div>
            <div className="h-24 w-24 bg-black/10 rounded-full">
              {botResponse && <HandCircle pos={4} item={botResponse} bot={true} />}
              <div className="translate-y-32 -translate-x-1">
                <animated.p style={chooseTxtAnim}>HOUSE PICKED</animated.p>
              </div>
            </div>
          </div>
        </div>
      )}
      {botResponse && (
        <animated.div style={verdictAnim}>
          <p className="text-6xl text-white font-[700] mb-6">YOU {score.string}</p>
          <button className="w-full bg-white tracking-widest text-lg py-3 rounded-xl" onClick={() => playAgain()}>
            PLAY AGAIN
          </button>
        </animated.div>
      )}
    </div>
  );
};

export default MobileGameContainer;
