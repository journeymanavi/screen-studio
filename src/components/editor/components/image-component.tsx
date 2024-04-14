import { useStudio } from "@/contexts/studio/studio-hook";
import { cn } from "@/lib/utils";
import { ScreenComponentImage } from "@/types";
import { ImagePlusIcon } from "lucide-react";
import { MouseEventHandler, useCallback } from "react";
import { ScreenElement } from "../screen-element";

export type ImageComponentProps = {
  element: ScreenComponentImage;
};

export const ImageComponent = ({ element }: ImageComponentProps) => {
  const { studioState, dispatch } = useStudio();

  const updateSelectedElement: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        studioState.editor.selectedElement === null ||
        studioState.editor.selectedElement.id !== element.id
      ) {
        dispatch({
          type: "SELECT_ELEMENT",
          payload: {
            element,
          },
        });
      }
    },
    [dispatch, element, studioState.editor.selectedElement]
  );

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <ScreenElement element={element}>
        {!element.props.src ? (
          <div className="h-full flex justify-center items-center w-full">
            <ImagePlusIcon className="text-gray-500" size={52} />
          </div>
        ) : (
          <img
            src={element.props.src}
            className={cn("w-full h-full object-cover object-center", {
              "outline-1 outline-yellow-300 outline-dashed":
                studioState.editor.selectedElement?.id === element.id,
            })}
            onClick={updateSelectedElement}
          />
        )}
      </ScreenElement>
    );
  }

  return (
    <img
      src={element.props.src}
      className="w-full h-full object-cover object-center"
    />
  );
};
