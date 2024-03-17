import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "./lib/utils";
import { LayoutIconBentoBox } from "@/components/pallettes/layouts/layout-icon-bento-box";
import { LayoutIconPolaroid } from "@/components/pallettes/layouts/layout-icon-polaroid";

function App() {
  return (
    <main
      className={cn("bg-gray-200 min-h-screen max-h-screen p-2 flex gap-2")}
    >
      <div className="bg-white w-[300px] p-2 rounded-sm max-h-full overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={["layouts-pallette", "components-pallette"]}
        >
          <AccordionItem value="layouts-pallette">
            <AccordionTrigger>Layouts</AccordionTrigger>
            <AccordionContent className="flex gap-2 flex-wrap">
              <LayoutIconBentoBox />
              <LayoutIconPolaroid />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="components-pallette">
            <AccordionTrigger>Components</AccordionTrigger>
            <AccordionContent className=""></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex-1"></div>
    </main>
  );
}

export default App;
