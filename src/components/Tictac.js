import React, { useState } from "react";
import "./tictac.css";

function later(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
function getWinner(tictac, symb) {
  const wintable = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let win = false;
  wintable.forEach((winArr) => {
    if (win === true) return;
    if (
      tictac[winArr[0]].val === symb &&
      tictac[winArr[1]].val === symb &&
      tictac[winArr[2]].val === symb
    ) {
      win = true;
    }
  });
  return win;
}

const tictacDefault = [
  { id: 1, val: null },
  { id: 2, val: null },
  { id: 3, val: null },
  { id: 4, val: null },
  { id: 5, val: null },
  { id: 6, val: null },
  { id: 7, val: null },
  { id: 8, val: null },
  { id: 9, val: null },
];

function Tictac() {
  const [turn, setTurn] = useState(false);
  const [dis, setDis] = useState("none");
  const [text, setText] = useState("WINNER");
  const [tictac, setTicTac] = useState(tictacDefault);
  function Checkup(win) {
    if (getWinner(tictac, win)) {
      later(500).then(() => {
        setDis("block");
        setText(text + "---" + win);
        //console.log(tictac);
      });
    } else if (tictac.filter((t) => t.val === null).length === 0) {
      later(500).then(() => {
        setDis("block");
        setText("Draw...");
      });
    } else {
      setTurn(true);
    }
  }

  if (turn) {
    const ran = tictac.filter((nol) => nol.val === null);
    const random = ran[Math.floor(Math.random() * (ran.length - 1))];
    if (random) {
      const nolik = tictac.find((nol) => nol.id === random.id);

      later(400).then(() => {
        nolik.val = "O";
        //console.log(nolik.val);
        setTicTac([...tictac]);
        Checkup("O");
        setTurn(false);
      });
    }
  }

  return (
    <div className="cont">
      {tictac.map((play) => {
        return (
          <div
            key={play.id}
            className="div"
            onClick={() => {
              if (dis === "none") {
                if (!turn && !play.val) {
                  play.val = "X";
                  Checkup("X");
                }
                setTicTac([...tictac]);
              }
            }}
          >
            {play.val}
          </div>
        );
      })}
      {dis === "block" ? <h1 className="text">{text}</h1> : null}
      {dis === "block" ? (
        <button
          className="but"
          onClick={() => {
            setTicTac([
              { id: 1, val: null },
              { id: 2, val: null },
              { id: 3, val: null },
              { id: 4, val: null },
              { id: 5, val: null },
              { id: 6, val: null },
              { id: 7, val: null },
              { id: 8, val: null },
              { id: 9, val: null },
            ]);
            setText("WINNER");
            setTurn(false);
            setDis("none");
          }}
        >
          START AGAIN
        </button>
      ) : null}
    </div>
  );
}
export default Tictac
