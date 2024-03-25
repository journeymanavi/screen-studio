import { DRAGGABLE_TYPE_DATA_TRANSFER_KEY } from "@/constants";
import {
  ScreenComponentTypeImage,
  ScreenComponentTypeText,
  ScreenComponentTypeVideo,
  ScreenLayoutTypeBentoBox,
  ScreenLayoutTypeFullScreen,
  ScreenLayoutTypePolaroid,
} from "@/types";
import { DragEventHandler, HTMLAttributes, useCallback } from "react";

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  type:
    | ScreenLayoutTypeFullScreen
    | ScreenLayoutTypePolaroid
    | ScreenLayoutTypeBentoBox
    | ScreenComponentTypeText
    | ScreenComponentTypeImage
    | ScreenComponentTypeVideo;
}

export const Draggable = ({ onDragStart, type, children }: DraggableProps) => {
  const handleDragStart = useCallback<DragEventHandler<HTMLDivElement>>(
    (e) => {
      e.dataTransfer.setData(DRAGGABLE_TYPE_DATA_TRANSFER_KEY, type);
      onDragStart?.(e);
    },
    [onDragStart, type]
  );

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
};
