import { LayoutTool } from "./layout-tool";

export interface PolaroidLayoutToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const PolaroidLayoutTool = ({ onClick }: PolaroidLayoutToolProps) => {
  return (
    <LayoutTool
      label="Polaroid"
      onClick={onClick}
      draggableType="SCREEN_LAYOUT_TYPE_POLAROID"
    >
      <div className="flex-1 flex gap-1 items-end p-1" onClick={onClick}>
        <div className="bg-white flex-1 h-[70%]"></div>
      </div>
    </LayoutTool>
  );
};
