import { DragEventHandler, HTMLAttributes, useCallback } from "react";

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  type:
    | "layout-full-screen"
    | "layout-bento-box"
    | "layout-polaroid"
    | "component-text"
    | "component-video"
    | "component-image";
}

export const DRAGGABLE_TYPE_DATA_TRANSFER_KEY = "draggable-type";

export const Draggable = ({ onDragStart, type, children }: DraggableProps) => {
  const handleDragStart = useCallback<DragEventHandler<HTMLDivElement>>((e) => {
    if (children && children) {
    }
    e.dataTransfer.setData(DRAGGABLE_TYPE_DATA_TRANSFER_KEY, type);
    onDragStart?.(e);
  }, []);

  return (
    <div draggable onDragStart={handleDragStart}>
      {children}
    </div>
  );
};
