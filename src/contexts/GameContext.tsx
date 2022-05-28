import React, { createContext, useContext, useEffect, useState } from "react";

export type SelectionNumber = 1 | 2 | 3 | 4 | null;

const botPick = (): number => {
  const MIN = 1;
  const MAX = 3;
  const pick = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  return pick;
};

const compare = (selected: number, botResponse: number): any => {
  let res: any = {
    number: 0,
    string: "",
  };

  switch (selected) {
    case botResponse:
      res.number = 0;
      res.string = "TIE";
      break;
    case 1:
      if (botResponse === 2) {
        res.number = -1;
        res.string = "LOSE";
      } else if (botResponse === 3) {
        res.number = 1;
        res.string = "WIN";
      }
      break;
    case 2:
      if (botResponse === 3) {
        res.number = -1;
        res.string = "LOSE";
      } else if (botResponse === 1) {
        res.number = 1;
        res.string = "WIN";
      }
      break;
    case 3:
      if (botResponse === 1) {
        res.number = -1;
        res.string = "LOSE";
      } else if (botResponse === 2) {
        res.number = 1;
        res.string = "WIN";
      }
      break;
    default:
      res.number = 0;
      res.string = "";
  }

  return res;
};

const Game = (initial: number) => {
  const [selected, selectedSet] = useState<SelectionNumber>(null);
  const [botResponse, botResponseSet] = useState<SelectionNumber | number | any>(null);
  const [score, scoreSet] = useState<any>({ number: initial, string: "" });
  const [againDisplay, againDisplaySet] = useState(false);
  const [rulesOpen, rulesOpenSet] = useState(false);

  useEffect(() => {
    if (selected) {
      const timeToChoose = setInterval(() => {
        againDisplaySet(true);
        botResponseSet(botPick());
        clearInterval(timeToChoose);
      }, 1500);
    }
  }, [selected]);
  useEffect(() => {
    if (botResponse && selected) {
      let compared = compare(selected, botResponse);

      scoreSet((prev: any) => ({ number: prev.number + compared.number, string: compared.string }));
    }
  }, [botResponse]);

  return {
    selected,
    selectedSet,
    botResponse,
    score,
    scoreSet,
    rulesOpen,
    rulesOpenSet,
    playAgain: () => {
      botResponseSet(null);
      selectedSet(null);

      localStorage.setItem("RPS_Save", score.number);
    },
    againDisplay,
    againDisplaySet,
  };
};

export type GameType = ReturnType<typeof Game>;

const GameContext = createContext<GameType | null>(null);

export const useGameContext = () => useContext(GameContext)!;

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initial: number = Number(localStorage.getItem("RPS_Save"));

  return <GameContext.Provider value={Game(initial)}>{children}</GameContext.Provider>;
};
