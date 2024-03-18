import { Play } from "lucide-react";
import { Button } from "./ui/button";

export const ScreenCanvas = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div className="w-[800px] h-[500px] bg-gray-400"></div>
      <Button
        size="icon"
        onClick={() => {
          alert("TODO");
        }}
        aria-label="play"
        className="rounded-full"
      >
        <Play />
      </Button>
    </div>
  );
};
