import { PlayIcon, Redo2Icon, Undo2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const ActionBar = () => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-2xl flex gap-2">
      <div className="flex gap-2">
        <Button size="icon" variant="outline">
          <Undo2Icon />
        </Button>
        <Button size="icon" variant="outline">
          <Redo2Icon />
        </Button>
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-2">
        <Button size="icon" variant="outline">
          <PlayIcon />
        </Button>
      </div>
    </div>
  );
};
