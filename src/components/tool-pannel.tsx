import { useStudio } from "@/contexts/studio/studio-hooks";
import { cn } from "@/lib/utils";
import {
  LayoutDashboardIcon,
  PlusIcon,
  PuzzleIcon,
  Settings2Icon,
  TrashIcon,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export const ToolPanel = () => {
  const { studioState, dispatch } = useStudio();

  return (
    <div className="bg-white  shadow-2xl w-[300px] p-2 rounded-lg max-h-full overflow-y-auto">
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
            {studioState.editor.screens.map((_, index) => (
              <div
                key={index}
                className="flex-1 rounded-sm flex items-center justify-between gap-2"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (studioState.editor.selectedScreen !== index) {
                      dispatch({
                        type: "SELECT_SCREEN",
                        payload: {
                          index,
                        },
                      });
                    }
                  }}
                  className={cn("text-xs h-6 flex-1 justify-start", {
                    "font-bold": studioState.editor.selectedScreen === index,
                  })}
                >
                  Screen {index + 1}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className={"w-6 h-6"}
                  onClick={() =>
                    dispatch({
                      type: "REQUEST_DELETE_SCREEN",
                      payload: { index },
                    })
                  }
                  disabled={studioState.editor.screens.length === 1}
                >
                  <TrashIcon size={16} />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                dispatch({
                  type: "ADD_SCREEN",
                });
              }}
              className="self-start text-xs h-6 w-full"
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
      <AlertDialog open={studioState.editor.requestedDeleteScreen !== null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete this screen and all the content on it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                dispatch({
                  type: "CANCEL_DELETE_SCREEN",
                });
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (studioState.editor.requestedDeleteScreen !== null) {
                  dispatch({
                    type: "CONFIRM_DELETE_SCREEN",
                    payload: {
                      index: studioState.editor.requestedDeleteScreen,
                    },
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
