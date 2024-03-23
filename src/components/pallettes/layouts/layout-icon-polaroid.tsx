import { LayoutIcon } from "./layout-icon";

export interface LayoutIconPolaroidProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const LayoutIconPolaroid = ({ onClick }: LayoutIconPolaroidProps) => {
  return (
    <LayoutIcon
      label="Polaroid"
      onClick={onClick}
      draggableType="layout-polaroid"
    >
      <div className="flex-1 flex gap-1 items-end p-1" onClick={onClick}>
        <div className="bg-white flex-1 h-[70%]"></div>
      </div>
    </LayoutIcon>
  );
};
