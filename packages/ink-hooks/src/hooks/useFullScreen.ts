import { useEffect } from "react";
import { fullScreen, exitFullScreen } from "../utils/edge";

export function useFullScreen() {
  useEffect(() => {
    fullScreen();
    return () => {
      exitFullScreen();
    };
  }, []);
  return exitFullScreen;
}
