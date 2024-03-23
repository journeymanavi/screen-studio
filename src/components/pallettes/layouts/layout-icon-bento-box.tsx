import { LayoutIcon } from "./layout-icon";

export interface LayoutIconBentoBoxProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const LayoutIconBentoBox = ({ onClick }: LayoutIconBentoBoxProps) => {
  return (
    <LayoutIcon
      label="Bento Box"
      onClick={onClick}
      draggableType="layout-bento-box"
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
    </LayoutIcon>
  );
};
