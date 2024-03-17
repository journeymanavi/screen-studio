export interface LayoutIconBentoBoxProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const LayoutIconBentoBox = ({ onClick }: LayoutIconBentoBoxProps) => {
  return (
    <div
      className="flex gap-1 bg-gray-200 w-[100px] h-[75px] p-1 cursor-pointer"
      onClick={onClick}
    >
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
  );
};
