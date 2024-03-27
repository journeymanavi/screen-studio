import { LayoutTool } from "./layout-tool";

export interface BentoBoxLayoutToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const BentoBoxLayoutTool = ({ onClick }: BentoBoxLayoutToolProps) => {
  return (
    <LayoutTool
      label="Bento Box"
      onClick={onClick}
      draggableType="SCREEN_LAYOUT_TYPE_BENTO_BOX"
    >
      <div className="flex-1 flex gap-1 p-1 ">
        <div className="bg-white flex-1"></div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex-1 flex gap-1">
            <div className="bg-white h-[50%]] flex-1"></div>
            <div className="bg-white h-[50%]] flex-1"></div>
          </div>
          <div className="flex-1 flex gap-1">
            <div className="bg-white h-[50%]] flex-1"></div>
            <div className="bg-white h-[50%]] flex-1"></div>
          </div>
        </div>
      </div>
    </LayoutTool>
  );
};
