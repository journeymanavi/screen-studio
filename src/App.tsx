import { Button } from "./components/ui/button"
import { cn } from "./lib/utils"

function App() {
  return (
    <main className={cn("my-5 mx-auto p-1 border border-gray-200 rounded-sm max-w-screen-sm min-h-56 flex flex-col gap-3 items-center justify-evenly")}>
      Initial Vite + React + TS + TW + Shadcn-UI Project
      <Button className="self-center" onClick={() => {alert("Hello!")}}>Click Me!</Button>
    </main>
  )
}

export default App
