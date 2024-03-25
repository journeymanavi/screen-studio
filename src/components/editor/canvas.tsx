import { useStudio } from "@/contexts/studio/studio-hook";
import { Screen } from "./screen";

export const Canvas = () => {
  const { studioState } = useStudio();
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div>
        <span className="text-xs text-muted-foreground">
          Screen {studioState.editor.selectedScreen + 1}
        </span>
        <Screen />
      </div>
    </div>
  );
};
