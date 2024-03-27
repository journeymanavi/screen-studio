import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { FocusEventHandler, PropsWithChildren, useCallback } from "react";
import { Dropzone, DropzoneProps } from "../../drag-n-drop/dropzone";
import { TextComponent } from "../components/text-component";

export type PolaroidLayoutProps = PropsWithChildren;

export const PolaroidLayout = ({ children }: PolaroidLayoutProps) => {
  const { studioState, dispatch } = useStudio();

  const selectedScreen =
    studioState.editor.screens[studioState.editor.selectedScreen];
  const screenLayout = selectedScreen.layout;

  if (
    screenLayout !== null &&
    screenLayout.type !== SCREEN_LAYOUT_TYPE_POLAROID
  ) {
    throw new Error(
      `PolaroidLayout can not render screen layout type ${screenLayout.type}!`
    );
  }

  const handleComponentDrop = useCallback<DropzoneProps["onDrop"]>(
    (e) => {
      console.log("PolaroidLayout.handleComponentDrop", e);

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
        type: "ADD_COMPONENT_TO_POLAROID_LAYOUT",
        payload: {
          componentType,
        },
      });
    },
    [dispatch]
  );

  const updatePolaroidLayoutTitleText = useCallback<
    FocusEventHandler<HTMLDivElement>
  >(
    (e) => {
      dispatch({
        type: "UPDATE_TITLE_OF_POLAROID_LAYOUT",
        payload: { titleText: e.currentTarget.textContent ?? "Edit me" },
      });
    },
    [dispatch]
  );

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    if (screenLayout === null) {
      return null;
    }

    return (
      <div className="flex-1 flex flex-col relative p-6 gap-6">
        <div className="absolute top-0 left-0 text-xs text-muted-foreground px-1 py-0.5">
          Polaroid Layout
        </div>
        <div
          className="border border-gray-500 text-2xl font-bold py-2"
          contentEditable
          onBlur={updatePolaroidLayoutTitleText}
        >
          {screenLayout.title}
        </div>
        <Dropzone
          onDrop={handleComponentDrop}
          className="flex-1 relative border border-gray-500"
        >
          {screenLayout.component === null ? null : screenLayout.component
              .type === "SCREEN_COMPONENT_TYPE_TEXT" ? (
            <TextComponent element={screenLayout.component} />
          ) : null}
        </Dropzone>
      </div>
    );
  }

  return <div className="flex-1">{children}</div>;
};
