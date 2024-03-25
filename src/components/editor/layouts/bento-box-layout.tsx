import { SCREEN_LAYOUT_TYPE_BENTO_BOX } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { PropsWithChildren } from "react";

export type BentoBoxLayoutProps = PropsWithChildren;

export const BentoBoxLayout = ({ children }: BentoBoxLayoutProps) => {
  const { studioState /*, dispatch*/ } = useStudio();

  const selectedScreen =
    studioState.editor.screens[studioState.editor.selectedScreen];
  const screenLayout = selectedScreen.layout;

  if (
    screenLayout !== null &&
    screenLayout.type !== SCREEN_LAYOUT_TYPE_BENTO_BOX
  ) {
    throw new Error(
      `FullScreenLayout can not render screen layout type ${screenLayout.type}!`
    );
  }

  const containerClassName = "w-full height-full flex-1";

  // const handleComponentDrop = useCallback<DropzoneProps["onDrop"]>(
  //   (e) => {
  //     console.log("BentoBoxLayout.handleComponentDrop", e);

  //     const componentType = e.dataTransfer.getData(
  //       DRAGGABLE_TYPE_DATA_TRANSFER_KEY
  //     );

  //     if (
  //       componentType !== SCREEN_COMPONENT_TYPE_TEXT &&
  //       componentType !== SCREEN_COMPONENT_TYPE_IMAGE &&
  //       componentType !== SCREEN_COMPONENT_TYPE_VIDEO
  //     ) {
  //       return;
  //     } else {
  //       e.stopPropagation();
  //     }

  //     dispatch({
  //       type: "ADD_COMPONENT_TO_BENTO_BOX_LAYOUT",
  //       payload: {
  //         componentType,
  //         slotIndex: 0,
  //       },
  //     });
  //   },
  //   [dispatch]
  // );

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <div className={containerClassName}>
        <span>Bento Box Layout</span>
      </div>
    );
  }

  return <div className={containerClassName}>{children}</div>;
};
