import { Play } from "lucide-react";
import { DRAGGABLE_TYPE_DATA_TRANSFER_KEY } from "./drag-n-drop/draggable";
import { Dropzone } from "./drag-n-drop/dropzone";
import { Button } from "./ui/button";

export const ScreenCanvas = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div className="w-[800px] h-[500px] bg-gray-400 relative">
        <Dropzone
          className="bg-gray-500 inset-0 absolute"
          onDrop={(e) => {
            console.log(
              `Dropped ${e.dataTransfer.getData(
                DRAGGABLE_TYPE_DATA_TRANSFER_KEY
              )}`
            );
          }}
        />
      </div>
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
