import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  EDITOR_MODE_PREVIEW,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { makeNewComponent } from "@/contexts/studio/studio-reducer";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { Dropzone, DropzoneProps } from "../../drag-n-drop/dropzone";
import { ImageComponent } from "../components/image-component";
import { TextComponent } from "../components/text-component";
import { VideoComponent } from "../components/video-component";
import { ScreenElement } from "../screen-element";

export const FullScreenLayout = () => {
  const { studioState, dispatch } = useStudio();

  const showPlayer = studioState.showPlayer;

  const mode = studioState.editor.mode;

  const selectedScreen = showPlayer
    ? studioState.player.screenSpec
    : studioState.editor.screens[studioState.editor.selectedScreen];

  const screenLayout = selectedScreen?.layout;

  const handleComponentDrop = useCallback<DropzoneProps["onDrop"]>(
    (e) => {
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

      const newComponent = makeNewComponent(componentType);

      if (screenLayout) {
        dispatch({
          type: "UPDATE_ELEMENT_PROPS",
          payload: {
            elementId: screenLayout.id,
            elementType: SCREEN_LAYOUT_TYPE_FULL_SCREEN,
            props: {
              component: newComponent,
            },
          },
        });

        dispatch({
          type: "SELECT_ELEMENT",
          payload: { element: newComponent },
        });
      }
    },
    [dispatch, screenLayout]
  );

  if (!selectedScreen || !screenLayout) {
    return null;
  }

  if (screenLayout.type !== SCREEN_LAYOUT_TYPE_FULL_SCREEN) {
    throw new Error(
      `FullScreenLayout can not render screen layout type ${screenLayout.type}!`
    );
  }

  const containerClassName = "w-full h-full flex-1";

  if (screenLayout === null) {
    return null;
  }

  const component = screenLayout.props.component;

  let maybeComponentToRender: JSX.Element | null = null;

  switch (component?.type) {
    case "SCREEN_COMPONENT_TYPE_TEXT":
      maybeComponentToRender = <TextComponent element={component} />;
      break;
    case "SCREEN_COMPONENT_TYPE_IMAGE":
      maybeComponentToRender = <ImageComponent element={component} />;
      break;
    case "SCREEN_COMPONENT_TYPE_VIDEO":
      maybeComponentToRender = <VideoComponent element={component} />;
      break;
    default:
      maybeComponentToRender = null;
      break;
  }

  if (showPlayer || mode === EDITOR_MODE_PREVIEW) {
    return <div className={containerClassName}>{maybeComponentToRender}</div>;
  }

  return (
    <ScreenElement element={screenLayout}>
      <Dropzone onDrop={handleComponentDrop} className={cn("p-6")}>
        {maybeComponentToRender}
      </Dropzone>
    </ScreenElement>
  );
};
