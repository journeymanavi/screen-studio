import { StudioContextValue } from "@/types";
import { createContext } from "react";
import { initialStudioState } from "./studio-constants";

export const StudioContext = createContext<StudioContextValue>({
  studioState: initialStudioState,
  dispatch: () => undefined,
});
