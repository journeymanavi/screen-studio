import { useStudio } from "@/contexts/studio/studio-hook";
import { cn } from "@/lib/utils";
import { ScreenComponentText } from "@/types";
import { FocusEventHandler, MouseEventHandler, useCallback } from "react";

export type TextComponentProps = {
  element: ScreenComponentText;
};

export const TextComponent = ({ element }: TextComponentProps) => {
  const { studioState, dispatch } = useStudio();

  const updateSelectedElement: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        studioState.editor.selectedElement === null ||
        studioState.editor.selectedElement.id !== element.id
      ) {
        dispatch({
          type: "SELECT_SCREEN_ELEMENT",
          payload: {
            element,
          },
        });
      }
    },
    [dispatch, element, studioState.editor.selectedElement]
  );

  const updateTextComponentProps: FocusEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        dispatch({
          type: "UPDATE_SELECTED_COMPONENT_PROPS",
          payload: {
            props: {
              innerText: e.currentTarget.innerText ?? "",
            },
          },
        });
      },
      [dispatch]
    );

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <div
        style={element.style}
        className={cn({
          "outline-1 outline-yellow-300 outline-dashed":
            studioState.editor.selectedElement?.id === element.id,
        })}
        onClick={updateSelectedElement}
        contentEditable="plaintext-only"
        onBlur={updateTextComponentProps}
      >
        {element.props.innerText}
      </div>
    );
  }

  return <div style={element.style}>{element.props.innerText}</div>;
};
