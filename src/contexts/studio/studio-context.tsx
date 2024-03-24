import { createContext } from "react";
import { initialStudioState } from "./studio-constants";
import { StudioContextValue } from "./types";

export const StudioContext = createContext<StudioContextValue>({
  studioState: initialStudioState,
  dispatch: () => undefined,
});
