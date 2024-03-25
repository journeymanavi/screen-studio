import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { PropsWithChildren, useCallback } from "react";
import { Dropzone, DropzoneProps } from "../../drag-n-drop/dropzone";
import { TextComponent } from "../components/text-component";

export type FullScreenLayoutProps = PropsWithChildren;

export const FullScreenLayout = ({ children }: FullScreenLayoutProps) => {
  const { studioState, dispatch } = useStudio();

  const selectedScreen =
    studioState.editor.screens[studioState.editor.selectedScreen];
  const screenLayout = selectedScreen.layout;

  if (
    screenLayout !== null &&
    screenLayout.type !== SCREEN_LAYOUT_TYPE_FULL_SCREEN
  ) {
    throw new Error(
      `FullScreenLayout can not render screen layout type ${screenLayout.type}!`
    );
  }

  const containerClassName = "w-full height-full flex-1";

  const handleComponentDrop = useCallback<DropzoneProps["onDrop"]>(
    (e) => {
      console.log("FullScreenLayout.handleComponentDrop", e);

      const componentType = e.dataTransfer.getData(
        DRAGGABLE_TYPE_DATA_TRANSFER_KEY
      );

      if (
        componentType !== SCREEN_COMPONENT_TYPE_TEXT &&
        componentType !== SCREEN_COMPONENT_TYPE_IMAGE &&
        componentType !== SCREEN_COMPONENT_TYPE_VIDEO
      ) {
        return;
      } else {
        e.stopPropagation();
      }

      dispatch({
        type: "ADD_COMPONENT_TO_FULL_SCREEN_LAYOUT",
        payload: {
          componentType,
        },
      });
    },
    [dispatch]
  );

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    if (screenLayout === null) {
      return null;
    }

    return (
      <div className="flex-1 flex flex-col relative p-6">
        <div className="absolute top-0 left-0 text-xs text-muted-foreground px-1 py-0.5">
          Full Screen Layout
        </div>

        <Dropzone
          onDrop={handleComponentDrop}
          className="flex-1 relative border border-gray-500"
        >
          {screenLayout.component === null ? null : screenLayout.component
              .type === "SCREEN_COMPONENT_TYPE_TEXT" ? (
            <TextComponent style={{ ...screenLayout.component.style }}>
              {screenLayout.component.prop.innerText}
            </TextComponent>
          ) : null}
        </Dropzone>
      </div>
    );
  }

  return <div className={containerClassName}>{children}</div>;
};
