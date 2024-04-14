import { EDITOR_MODE_EDIT } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import {
  Edit3Icon,
  FileDownIcon,
  PlayIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
          title="undo"
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
          title="redo"
        >
          <Redo2Icon size={20} />
        </Button>
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-2">
        {studioState.editor.mode === EDITOR_MODE_EDIT ? (
          <Button
            size="icon"
            variant="outline"
            className="w-7 h-7"
            title="preview"
            onClick={() => {
              dispatch({ type: "SWITCH_TO_PREVIEW_MODE" });
            }}
          >
            <PlayIcon size={20} />
          </Button>
        ) : (
          <Button
            size="icon"
            variant="outline"
            className="w-7 h-7"
            title="edit"
            onClick={() => {
              dispatch({ type: "SWITCH_TO_EDIT_MODE" });
            }}
          >
            <Edit3Icon size={20} />
          </Button>
        )}
        <Button
          size="icon"
          variant="outline"
          className="w-7 h-7"
          title="export"
        >
          <FileDownIcon size={20} />
        </Button>
      </div>
    </div>
  );
};
