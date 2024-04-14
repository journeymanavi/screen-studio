import {
  DRAGGABLE_TYPE_DATA_TRANSFER_KEY,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { makeNewComponent } from "@/contexts/studio/studio-reducer";
import { FocusEventHandler, useCallback, useEffect, useRef } from "react";
import { Dropzone, DropzoneProps } from "../../drag-n-drop/dropzone";
import { ImageComponent } from "../components/image-component";
import { TextComponent } from "../components/text-component";
import { VideoComponent } from "../components/video-component";
import { ScreenElement } from "../screen-element";

export const PolaroidLayout = () => {
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
            elementType: SCREEN_LAYOUT_TYPE_POLAROID,
            props: {
              title: screenLayout.props.title,
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

  const updatePolaroidLayoutTitleText = useCallback<
    FocusEventHandler<HTMLDivElement>
  >(
    (e) => {
      if (screenLayout) {
        dispatch({
          type: "UPDATE_ELEMENT_PROPS",
          payload: {
            elementId: screenLayout.id,
            elementType: SCREEN_LAYOUT_TYPE_POLAROID,
            props: {
              title: e.currentTarget.textContent ?? "Edit me",
              component: screenLayout.props.component,
            },
          },
        });
      }
    },
    [dispatch, screenLayout]
  );

  const layoutTitleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      layoutTitleRef.current &&
      screenLayout !== null &&
      layoutTitleRef.current.innerText !== screenLayout.props.title
    ) {
      layoutTitleRef.current.innerText = screenLayout.props.title;
    }
  }, [screenLayout]);

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

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <ScreenElement element={screenLayout} className="p-6 flex">
        <div className="flex-1 flex flex-col gap-4 relative">
          <div
            ref={layoutTitleRef}
            className="border border-gray-300 text-2xl font-bold py-2 px-0.5 outline-none"
            contentEditable
            onBlur={updatePolaroidLayoutTitleText}
          />
          <div className="flex-1 border border-gray-300 relative">
            <Dropzone onDrop={handleComponentDrop} className="p-6">
              {maybeComponentToRender}
            </Dropzone>
          </div>
        </div>
      </ScreenElement>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <div ref={layoutTitleRef} className="text-2xl font-bold py-2 px-0.5" />
      <div className="flex-1 relative overflow-hidden">
        {maybeComponentToRender}
      </div>
    </div>
  );
};
