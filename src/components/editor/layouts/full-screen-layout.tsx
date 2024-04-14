import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { makeNewComponent } from "@/contexts/studio/studio-reducer";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useCallback } from "react";
import { Dropzone, DropzoneProps } from "../../drag-n-drop/dropzone";
import { ImageComponent } from "../components/image-component";
import { TextComponent } from "../components/text-component";
import { VideoComponent } from "../components/video-component";
import { ScreenElement } from "../screen-element";

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

  const containerClassName = "w-full h-full flex-1";

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

      // console.log(
      //   "FullScreenLayout.handleComponentDrop",
      //   e,
      //   componentType,
      //   newComponent
      // );

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

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
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

    return (
      <ScreenElement element={screenLayout}>
        <Dropzone onDrop={handleComponentDrop} className={cn("p-6")}>
          {maybeComponentToRender}
        </Dropzone>
      </ScreenElement>
    );
  }

  return <div className={containerClassName}>{children}</div>;
};
