export interface LayoutIconPolaroidProps {
  onClick?: React.HTMLAttributes<HTMLDivElement>["onClick"];
}

export const LayoutIconPolaroid = ({ onClick }: LayoutIconPolaroidProps) => {
  return (
    <div
      className="flex gap-1 items-end bg-gray-200 w-[100px] h-[75px] p-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white flex-1 h-[70%]"></div>
    </div>
  );
};
