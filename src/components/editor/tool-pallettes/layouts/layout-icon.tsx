import { Draggable } from "@/components/drag-n-drop/draggable";
import {
  ScreenLayoutTypeBentoBox,
  ScreenLayoutTypeFullScreen,
  ScreenLayoutTypePolaroid,
} from "@/types";
import { PropsWithChildren } from "react";

export interface LayoutIconProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
  label: string;
  draggableType:
    | ScreenLayoutTypeFullScreen
    | ScreenLayoutTypePolaroid
    | ScreenLayoutTypeBentoBox;
}

export const LayoutIcon = ({
  onClick,
  label,
  draggableType,
  children,
}: PropsWithChildren<LayoutIconProps>) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <Draggable type={draggableType}>
        <div
          className="bg-gray-200 hover:bg-gray-400 w-[80px] h-[50px] cursor-pointer flex rounded-sm"
          onClick={onClick}
        >
          {children}
        </div>
      </Draggable>
      <span className="text-xs">{label}</span>
    </div>
  );
};
