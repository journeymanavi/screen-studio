import { useContext } from "react";
import { StudioContext } from "./studio-context";

export const useStudio = () => {
  const value = useContext(StudioContext);

  if (!value) {
    throw new Error(
      "useStudioContext can only be used from a subtree under the StudioContext!"
    );
  }

  return value;
};
