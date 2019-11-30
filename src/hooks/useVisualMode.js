import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace === true) {
      history.pop();
    }
    history.push(newMode);
    setMode(newMode);
  }

  const back = function() {
    if (history.length > 1) {
      history.pop();
      const temp = history[history.length - 1];
      setMode(temp);
    }
  };

  return {
    mode,
    transition,
    back
  };
}
