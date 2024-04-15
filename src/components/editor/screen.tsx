import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  EDITOR_MODE_PREVIEW,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { useCallback } from "react";
import { Dropzone, DropzoneProps } from "../drag-n-drop/dropzone";
import { BentoBoxLayout } from "./layouts/bento-box-layout";
import { FullScreenLayout } from "./layouts/full-screen-layout";
import { PolaroidLayout } from "./layouts/polaroid-layout";

export const Screen = () => {
  const { studioState, dispatch } = useStudio();

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

  const showPlayer = studioState.showPlayer;

  const mode = studioState.editor.mode;

  const selectedScreen = showPlayer
    ? studioState.player.screenSpec
    : studioState.editor.screens[studioState.editor.selectedScreen];

  if (!selectedScreen) {
    return null;
  }

  const { aspectRatio, layout } = selectedScreen;

  const containerClassName = `flex relative bg-white ${
    aspectRatio === "4:3" ? `w-[800px] h-[600px]` : `w-[800px] h-[450px]`
  }`;
  const maybeLayout =
    layout === null ? null : layout.type ===
      "SCREEN_LAYOUT_TYPE_FULL_SCREEN" ? (
      <FullScreenLayout />
    ) : layout.type === "SCREEN_LAYOUT_TYPE_POLAROID" ? (
      <PolaroidLayout />
    ) : layout.type === "SCREEN_LAYOUT_TYPE_BENTO_BOX" ? (
      <BentoBoxLayout />
    ) : null;

  if (showPlayer || mode === EDITOR_MODE_PREVIEW) {
    return <div className={containerClassName}>{maybeLayout}</div>;
  }

  return (
    <div className={containerClassName}>
      <Dropzone className="p-6" onDrop={handleLayoutDrop}>
        {maybeLayout}
      </Dropzone>
    </div>
  );
};
