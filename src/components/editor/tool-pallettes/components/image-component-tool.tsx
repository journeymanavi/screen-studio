import { ImageIcon } from "lucide-react";
import { ComponentTool } from "./component-tool";

export interface ImageComponentToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const ImageComponentTool = ({ onClick }: ImageComponentToolProps) => {
  return (
    <ComponentTool
      label="Image"
      onClick={onClick}
      draggableType="SCREEN_COMPONENT_TYPE_IMAGE"
    >
      <ImageIcon />
    </ComponentTool>
  );
};
