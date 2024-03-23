import {
  EyeIcon,
  EyeOffIcon,
  LayoutDashboardIcon,
  PlusIcon,
  PuzzleIcon,
  Settings2Icon,
  Tv2Icon,
} from "lucide-react";
import { LayoutIconBentoBox } from "./pallettes/layouts/layout-icon-bento-box";
import { LayoutIconFullScreen } from "./pallettes/layouts/layout-icon-full-screen";
import { LayoutIconPolaroid } from "./pallettes/layouts/layout-icon-polaroid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";

export const PalletteBar = () => (
  <div className="bg-white w-[300px] p-2 rounded-sm max-h-full overflow-y-auto">
    <Accordion
      type="multiple"
      defaultValue={[
        "screens",
        "layouts-pallette",
        "components-pallette",
        "properties",
      ]}
    >
      <AccordionItem value="screens">
        <AccordionTrigger>
          <div className="flex-1 flex justify-between items-center mr-2">
            <span className="flex gap-2">
              <Tv2Icon /> Screens
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 flex-wrap p-2">
          <div className="flex-1 py-1 px-2 rounded-sm flex items-center justify-between gap-2 hover:bg-gray-100">
            <span className="text-xs font-bold">Screen 1</span>
            <EyeIcon size={16} />
          </div>
          <div className="flex-1 py-1 px-2 rounded-sm flex items-center justify-between gap-2 hover:bg-gray-100">
            <span className="text-xs">Screen 2</span> <EyeOffIcon size={16} />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              alert("TODO: Add Screen");
              e.preventDefault();
            }}
            className="self-start text-xs"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Screen
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="layouts-pallette">
        <AccordionTrigger>
          <span className="flex gap-2">
            <LayoutDashboardIcon /> Layouts
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex gap-2 flex-wrap p-2">
          <LayoutIconFullScreen />
          <LayoutIconPolaroid />
          <LayoutIconBentoBox />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="components-pallette">
        <AccordionTrigger>
          <span className="flex gap-2">
            <PuzzleIcon />
            Components
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex gap-2 flex-wrap p-2">
          <span className="text-xs">TODO</span>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="properties">
        <AccordionTrigger>
          <span className="flex gap-2">
            <Settings2Icon />
            Properties
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex gap-2 flex-wrap p-2">
          <span className="text-xs">TODO</span>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
