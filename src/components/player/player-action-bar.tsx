import { useStudio } from "@/contexts/studio/studio-hook";
import { FileUpIcon, PlayIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const PlayerActionBar = () => {
  const { dispatch } = useStudio();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="bg-white p-2 rounded-lg shadow-2xl flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="w-7 h-7"
            title="export"
          >
            <FileUpIcon size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Screen Spec</DialogTitle>
            <DialogDescription>
              Paste the screen spec copied from the Editor to begin playback.
            </DialogDescription>
          </DialogHeader>
          <textarea
            ref={textAreaRef}
            name="screen-spec"
            id="screen-spec"
            rows={10}
            defaultValue=""
            className="font-mono border border-gray-300 rounded-md p-2 my-4"
          />
          <DialogFooter className="flex items-end md:flex-col gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={async () => {
                  try {
                    dispatch({
                      type: "UPDATE_PLAYER_SCREEN_SPEC",
                      payload: {
                        screenSpec: JSON.parse(
                          textAreaRef.current?.value ?? ""
                        ),
                      },
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <PlayIcon className="mr-2 h-4 w-4" />
                Play
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
