import { useStudio } from "@/contexts/studio/studio-hook";
import { MouseEventHandler, useCallback } from "react";
import { Screen } from "./screen";

export const Canvas = () => {
  const { studioState, dispatch } = useStudio();

  const updateSelectedElement: MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (studioState.editor.selectedElement !== null) {
        dispatch({
          type: "SELECT_ELEMENT",
          payload: {
            element: null,
          },
        });
      }
    },
    [dispatch, studioState.editor.selectedElement]
  );

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div>
        <span
          className="text-xs text-muted-foreground cursor-pointer"
          onClick={updateSelectedElement}
        >
          Screen {studioState.editor.selectedScreen + 1}
        </span>
        <Screen />
      </div>
    </div>
  );
};
