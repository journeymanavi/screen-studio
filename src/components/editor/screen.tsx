import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { Dropzone, DropzoneProps } from "../drag-n-drop/dropzone";
import { BentoBoxLayout } from "./layouts/bento-box-layout";
import { FullScreenLayout } from "./layouts/full-screen-layout";
import { PolaroidLayout } from "./layouts/polaroid-layout";

export const Screen = () => {
  const { studioState, dispatch } = useStudio();

  const mode = studioState.editor.mode;

  const selectedScreen =
    studioState.editor.screens[studioState.editor.selectedScreen];

  const { aspectRatio, layout } = selectedScreen;

  const widthHeightClassName =
    aspectRatio === "4:3" ? `w-[800px] h-[600px]` : `w-[800px] h-[450px]`;

  const maybeLayout =
    layout === null ? null : layout.type ===
      "SCREEN_LAYOUT_TYPE_FULL_SCREEN" ? (
      <FullScreenLayout />
    ) : layout.type === "SCREEN_LAYOUT_TYPE_POLAROID" ? (
      <PolaroidLayout />
    ) : layout.type === "SCREEN_LAYOUT_TYPE_BENTO_BOX" ? (
      <BentoBoxLayout />
    ) : null;

  const handleLayoutDrop = useCallback<DropzoneProps["onDrop"]>(
    (e) => {
      const layoutType = e.dataTransfer.getData(
        DRAGGABLE_TYPE_DATA_TRANSFER_KEY
      );

      if (
        layoutType !== SCREEN_LAYOUT_TYPE_FULL_SCREEN &&
        layoutType !== SCREEN_LAYOUT_TYPE_POLAROID &&
        layoutType !== SCREEN_LAYOUT_TYPE_BENTO_BOX
      ) {
        return;
      } else {
        e.stopPropagation();
      }

      dispatch({
        type: "ADD_LAYOUT_TO_SELECTED_SCREEN",
        payload: {
          layoutType,
        },
      });
    },
    [dispatch]
  );

  return (
    <div className={cn("flex relative bg-white", widthHeightClassName)}>
      {mode === "EDITOR_MODE_EDIT" ? (
        <Dropzone className="p-6" onDrop={handleLayoutDrop}>
          {maybeLayout}
        </Dropzone>
      ) : (
        maybeLayout
      )}
    </div>
  );
};
