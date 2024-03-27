import { FilmIcon } from "lucide-react";
import { ComponentTool } from "./component-tool";

export interface VideoComponentToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const VideoComponentTool = ({ onClick }: VideoComponentToolProps) => {
  return (
    <ComponentTool
      label="Video"
      onClick={onClick}
      draggableType="SCREEN_COMPONENT_TYPE_VIDEO"
    >
      <FilmIcon />
    </ComponentTool>
  );
};
