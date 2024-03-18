import { PalletteBar } from "./components/pallette-bar";
import { ScreenCanvas } from "./components/screen-canvas";
import { cn } from "./lib/utils";

function ScreenStudio() {
  return (
    <main
      className={cn("bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2")}
    >
      <PalletteBar />
      <ScreenCanvas />
    </main>
  );
}

export default ScreenStudio;
