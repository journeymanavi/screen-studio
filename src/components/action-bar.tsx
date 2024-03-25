import { useStudio } from "@/contexts/studio/studio-hook";
import { PlayIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const ActionBar = () => {
  const { studioState, dispatch } = useStudio();

  const canNotUndo =
    studioState.editorHistory.history.length <= 1 ||
    studioState.editorHistory.current === 0;

  const canNotRedo =
    studioState.editorHistory.history.length <=
    studioState.editorHistory.current + 1;

  return (
    <div className="bg-white p-2 rounded-lg shadow-2xl flex gap-2">
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="w-7 h-7"
          disabled={canNotUndo}
          onClick={() => {
            dispatch({ type: "UNDO" });
          }}
        >
          <Undo2Icon size={20} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="w-7 h-7"
          disabled={canNotRedo}
          onClick={() => {
            dispatch({ type: "REDO" });
          }}
        >
          <Redo2Icon size={20} />
        </Button>
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-2">
        <Button size="icon" variant="outline" className="w-7 h-7">
          <PlayIcon size={20} />
        </Button>
      </div>
    </div>
  );
};
