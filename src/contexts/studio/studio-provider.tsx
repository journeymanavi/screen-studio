import { PropsWithChildren, useReducer } from "react";
import { initialStudioState } from "./studio-constants";
import { StudioContext } from "./studio-context";
import { studioReducer } from "./studio-reducer";

export const StudioProvider = ({ children }: PropsWithChildren) => {
  const [studioState, dispatch] = useReducer<typeof studioReducer>(
    studioReducer,
    initialStudioState
  );

  return (
    <StudioContext.Provider
      value={{
        studioState,
        dispatch,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};
