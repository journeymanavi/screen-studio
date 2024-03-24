import { ActionBar } from "./components/action-bar";
import { Canvas } from "./components/canvas";
import { ToolPanel } from "./components/tool-pannel";
import { StudioProvider } from "./contexts/studio/studio-provider";

function ScreenStudio() {
  return (
    <StudioProvider>
      <main className="bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2">
        <ToolPanel />
        <div className="flex-1 flex flex-col gap-4 items-center">
          <ActionBar />
          <Canvas />
        </div>
      </main>
    </StudioProvider>
  );
}

export default ScreenStudio;
