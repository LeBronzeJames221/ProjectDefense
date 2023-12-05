import { useState } from "react";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    if (persistedState) {
      return JSON.parse(persistedState);
    }

    return defaultValue;
  });

  const setPersistedState = (value) => {
    setState(value);
    let serizlizedValue;

    if (typeof value === "function") {
      serizlizedValue = JSON.stringify(value(state));
    } else {
      serizlizedValue = JSON.stringify(value);
    }
    localStorage.setItem(key, serizlizedValue);
  };
  return [state, setPersistedState];
}
