import { LayoutIcon } from "./layout-icon";

export interface LayoutIconFullScreenProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const LayoutIconFullScreen = ({
  onClick,
}: LayoutIconFullScreenProps) => {
  return (
    <LayoutIcon
      label="Full Screen"
      onClick={onClick}
      draggableType="SCREEN_LAYOUT_TYPE_FULL_SCREEN"
    >
      <div className="flex-1 flex gap-1 items-end p-1" onClick={onClick}>
        <div className="bg-white flex-1 h-full"></div>
      </div>
    </LayoutIcon>
  );
};
