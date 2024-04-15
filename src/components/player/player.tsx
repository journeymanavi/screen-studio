import { Screen } from "../editor/screen";
import { PlayerActionBar } from "./player-action-bar";

export const Player = () => {
  return (
    <main className="bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2">
      <div className="flex-1 flex flex-col gap-4 items-center">
        <PlayerActionBar />
        <div className="flex-1 flex justify-center items-center">
          <Screen />
        </div>
      </div>
    </main>
  );
};
