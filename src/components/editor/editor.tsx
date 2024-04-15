import { EDITOR_MODE_EDIT } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { Canvas } from "./canvas";
import { EditorActionBar } from "./editor-action-bar";
import { ToolPanel } from "./tool-panel";

export const Editor = () => {
  const { studioState } = useStudio();
  return (
    <main className="bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2">
      {studioState.editor.mode === EDITOR_MODE_EDIT && <ToolPanel />}
      <div className="flex-1 flex flex-col gap-4 items-center">
        <EditorActionBar />
        <Canvas />
      </div>
    </main>
  );
};
