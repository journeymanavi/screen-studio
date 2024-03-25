import { ActionBar } from "./action-bar";
import { Canvas } from "./canvas";
import { ToolPanel } from "./tool-pannel";

export const Editor = () => {
  return (
    <main className="bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2">
      <ToolPanel />
      <div className="flex-1 flex flex-col gap-4 items-center">
        <ActionBar />
        <Canvas />
      </div>
    </main>
  );
};
