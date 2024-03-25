import { useStudio } from "@/contexts/studio/studio-hook";
import { DRAGGABLE_TYPE_DATA_TRANSFER_KEY } from "./drag-n-drop/draggable";
import { Dropzone } from "./drag-n-drop/dropzone";

export const Canvas = () => {
  const { studioState } = useStudio();
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div>
        <span className="text-xs text-muted-foreground">
          Screen {studioState.editor.selectedScreen + 1}
        </span>
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
      </div>
    </div>
  );
};
