import { Draggable } from "@/components/drag-n-drop/draggable";
import { ScreenComponentType } from "@/types";
import { PropsWithChildren } from "react";

export interface ComponentToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
  label: string;
  draggableType: ScreenComponentType;
}

export const ComponentTool = ({
  onClick,
  label,
  draggableType,
  children,
}: PropsWithChildren<ComponentToolProps>) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <Draggable type={draggableType}>
        <div
          className="bg-gray-200 hover:bg-gray-400 text-gray-500 hover:text-gray-800 p-1 cursor-pointer flex rounded-sm"
          onClick={onClick}
        >
          {children}
        </div>
      </Draggable>
      <span className="text-xs">{label}</span>
    </div>
  );
};
