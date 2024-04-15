import { ROUTE_PATTERN_EDITOR, ROUTE_PATTERN_PLAYER } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { useCallback, useEffect } from "react";
import { Editor } from "./editor/editor";
import { Player } from "./player/player";

export const Router = () => {
  const { studioState, dispatch } = useStudio();

  const handlePopState = useCallback(() => {
    dispatch({
      type: "NAVIGATE",
      payload: { route: window.location.pathname },
    });
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);

  if (ROUTE_PATTERN_PLAYER.test(studioState.route) === true) {
    return <Player />;
  } else if (ROUTE_PATTERN_EDITOR.test(studioState.route) === true) {
    return <Editor />;
  }

  return null;
};
