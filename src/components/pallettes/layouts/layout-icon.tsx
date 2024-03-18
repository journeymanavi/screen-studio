import { PropsWithChildren } from "react";

export interface LayoutIconProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
  label: string;
}

export const LayoutIcon = ({
  onClick,
  label,
  children,
}: PropsWithChildren<LayoutIconProps>) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div
        className="bg-gray-200 hover:bg-gray-400 w-[80px] h-[50px] cursor-pointer flex rounded-sm"
        onClick={onClick}
      >
        {children}
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
};
