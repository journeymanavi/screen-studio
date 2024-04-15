import { EDITOR_MODE_EDIT } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import {
  CheckIcon,
  CopyIcon,
  Edit3Icon,
  FileDownIcon,
  InfoIcon,
  PlayIcon,
  Redo2Icon,
  Undo2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

export const EditorActionBar = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    let timer: number | null = null;

    if (copied) {
      timer = window.setTimeout(() => {
        setCopied(false);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [copied]);

  const { studioState, dispatch } = useStudio();

  const canNotUndo =
    studioState.editorHistory.history.length <= 1 ||
    studioState.editorHistory.current === 0;

  const canNotRedo =
    studioState.editorHistory.history.length <=
    studioState.editorHistory.current + 1;

  const screenSpec =
    studioState.editor.screens[studioState.editor.selectedScreen];

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

        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="w-7 h-7"
              title="export"
            >
              <FileDownIcon size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Screen Spec</DialogTitle>
              <DialogDescription>
                To import in to the Screen Player.
              </DialogDescription>
            </DialogHeader>
            <textarea
              name="screen-spec"
              id="screen-spec"
              rows={10}
              defaultValue={JSON.stringify(screenSpec, null, 2)}
              className="font-mono border border-gray-300 rounded-md p-2 my-4"
            />
            <DialogFooter className="flex items-end md:flex-col gap-4">
              {copied ? (
                <Button
                  disabled
                  className="bg-green-700 disabled:opacity-100 text-white"
                >
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Copied!
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      JSON.stringify(screenSpec)
                    );
                    setCopied(true);
                  }}
                >
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy Spec
                </Button>
              )}

              <div className="flex text-blue-600">
                <InfoIcon className="mr-2 h-5 w-5 mt-1" />
                <span className="flex-1">
                  Once the screen spec is copied, go to the{" "}
                  <a
                    href="player"
                    className="underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState(
                        undefined,
                        "",
                        e.currentTarget.href
                      );
                      dispatch({
                        type: "NAVIGATE",
                        payload: { route: window.location.pathname },
                      });
                    }}
                  >
                    Screen Player
                  </a>{" "}
                  to import it and play it back.
                </span>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
