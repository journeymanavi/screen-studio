import { TypeIcon } from "lucide-react";
import { ComponentTool } from "./component-tool";

export interface TextComponentToolProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const TextComponentTool = ({ onClick }: TextComponentToolProps) => {
  return (
    <ComponentTool
      label="Text"
      onClick={onClick}
      draggableType="SCREEN_COMPONENT_TYPE_TEXT"
    >
      <TypeIcon />
    </ComponentTool>
  );
};
