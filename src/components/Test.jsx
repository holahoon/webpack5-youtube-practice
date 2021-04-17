import React, { useState, useEffect } from "react";

// the exported component can be either a function or a class

export default function Board({ initialConfiguration, onSolveCallback }) {
  const [configuration, setConfiguration] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);

  const swap = (index1, index2) => {
    setConfiguration((state) => {
      let temp = state[index1];
      state[index1] = configuration[index2];
      state[index2] = temp;
      return [...state];
    });
  };

  const onPuzzleClick = (index) => {
    const y = Math.floor(index / 4);
    const x = index % 4;
    const zeroIndex = configuration.indexOf(0);
    const zeroY = Math.floor(zeroIndex / 4);
    const zeroX = zeroIndex % 4;
    if (
      ((zeroX === x - 1 || zeroX === x + 1) && zeroY === y) ||
      (zeroX === x && (zeroY === y - 1 || zeroY === y + 1))
    ) {
      swap(zeroIndex, index);
    }
  };

  useEffect(() => {
    let check = configuration?.reduce((sum, item, index) => {
      console.log(item);
      if (item !== 0) {
        return (sum = sum && index === item - 1);
      } else {
        return (sum = sum && index === 15);
      }
    }, true);

    if (check) {
      //   onSolveCallback();
      alert("solved!");
    }
  }, [configuration]);

  console.log(configuration);

  return (
    <div className="board">
      {configuration?.map((conf, index) => {
        if (conf === 0) {
          return <div className="empty"></div>;
        }
        return (
          <div key={index} className="tile" onClick={() => onPuzzleClick(index)}>
            {conf}
          </div>
        );
      })}
    </div>
  );
}
