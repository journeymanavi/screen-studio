import { useStudio } from "@/contexts/studio/studio-hook";
import { cn } from "@/lib/utils";
import { ScreenComponent, ScreenLayout } from "@/types";
import { MouseEventHandler, PropsWithChildren, useCallback } from "react";

export type ScreenElementProps = PropsWithChildren<{
  element: ScreenLayout | ScreenComponent;
  className?: string;
}>;

export const ScreenElement = ({
  element,
  className,
  children,
}: ScreenElementProps) => {
  const { studioState, dispatch } = useStudio();

  const isSelected = studioState.editor.selectedElement?.id === element.id;

  const updateSelectedElement: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (
        studioState.editor.selectedElement === null ||
        studioState.editor.selectedElement.id !== element?.id
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

  return (
    <div
      className={cn(
        "w-full h-full flex-1 relative border border-gray-500",
        className,
        {
          "border-yellow-300": isSelected,
        }
      )}
      onClick={updateSelectedElement}
    >
      <div className={"left-0 top-0 absolute w-full"}>
        <div
          className={cn(
            "absolute bottom-0 left-0 text-xs px-1 rounded-t-sm cursor-pointer bg-gray-500 text-gray-300",
            {
              "bg-yellow-300 text-black font-bold": isSelected,
            }
          )}
        >
          {element.name}
        </div>
      </div>

      {children}
    </div>
  );
};
