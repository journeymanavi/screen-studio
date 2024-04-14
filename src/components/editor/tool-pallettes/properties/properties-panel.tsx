"use client";
import { Input } from "@/components/ui/input";
import {
  ASPECT_RATIO_16_IS_TO_9,
  ASPECT_RATIO_4_IS_TO_3,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import {
  ScreenAspectRatio16IsTo9,
  ScreenAspectRatio4IsTo3,
  ScreenComponentType,
  ScreenElementProps,
  UpdateElementPropsActionPayload,
} from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
} from "lucide-react";
import { FillPicker } from "./fill-picker";
import { ImagePicker } from "./image-picker";
import { VideoPicker } from "./video-picker";

export const PropertiesPanel = () => {
  const { studioState, dispatch } = useStudio();
  const selectedScreen =
    studioState.editor.screens[studioState.editor.selectedScreen];
  const selectedElement = studioState.editor.selectedElement;

  if (
    selectedElement !== null &&
    (selectedElement.type === SCREEN_LAYOUT_TYPE_FULL_SCREEN ||
      selectedElement.type === SCREEN_LAYOUT_TYPE_POLAROID ||
      selectedElement.type === SCREEN_LAYOUT_TYPE_BENTO_BOX)
  ) {
    return null;
  }

  const handleScreenAspectRatioChange = (
    aspectRatio: ScreenAspectRatio16IsTo9 | ScreenAspectRatio4IsTo3
  ) => {
    dispatch({
      type: "UPDATE_SCREEN_ASPECT_RATIO",
      payload: {
        aspectRatio,
      },
    });
  };

  const handlePropChange = (
    elementId: string,
    elementType: ScreenComponentType,
    props: ScreenElementProps<ScreenComponentType>
  ) => {
    dispatch({
      type: "UPDATE_ELEMENT_PROPS",
      payload: {
        elementId,
        elementType,
        props,
      } as UpdateElementPropsActionPayload,
    });
  };

  if (selectedElement === null) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground">Screen Aspect Ratio</p>
        <Tabs
          onValueChange={(aspectRatio: string) => {
            if (
              aspectRatio === ASPECT_RATIO_16_IS_TO_9 ||
              aspectRatio === ASPECT_RATIO_4_IS_TO_3
            ) {
              handleScreenAspectRatioChange(aspectRatio);
            }
          }}
          value={selectedScreen.aspectRatio}
        >
          <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit">
            <TabsTrigger
              value={ASPECT_RATIO_16_IS_TO_9}
              className="w-1/2 h-10 p-0 data-[state=active]:bg-gray-200"
            >
              16:9
            </TabsTrigger>
            <TabsTrigger
              value={ASPECT_RATIO_4_IS_TO_3}
              className="w-1/2 h-10 p-0 data-[state=active]:bg-gray-200"
            >
              4:3
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  }

  if (
    selectedElement !== null &&
    (selectedElement.type === SCREEN_COMPONENT_TYPE_IMAGE ||
      selectedElement.type === SCREEN_COMPONENT_TYPE_VIDEO)
  ) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground">Source</p>
        {selectedElement.type === SCREEN_COMPONENT_TYPE_IMAGE ? (
          <ImagePicker
            onSelect={(url) => {
              handlePropChange(selectedElement.id, selectedElement.type, {
                src: url,
              });
            }}
          />
        ) : (
          <VideoPicker
            onSelect={(url) => {
              handlePropChange(selectedElement.id, selectedElement.type, {
                src: url,
              });
            }}
          />
        )}
      </div>
    );
  }

  if (
    selectedElement !== null &&
    selectedElement.type === SCREEN_COMPONENT_TYPE_TEXT
  ) {
    return (
      <div className="flex flex-col gap-4">
        {/* size */}
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Size</p>
          <Input
            id="size"
            type="number"
            onChange={(e) =>
              handlePropChange(selectedElement.id, selectedElement.type, {
                size: Number(e.target.value),
              })
            }
            value={selectedElement.props.size}
          />
        </div>
        {/* wight */}
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Weight</p>
          <Tabs
            onValueChange={(weight: string) => {
              if (
                weight === "thin" ||
                weight === "normal" ||
                weight === "bold"
              ) {
                handlePropChange(selectedElement.id, selectedElement.type, {
                  weight,
                });
              }
            }}
            value={selectedElement.props.weight}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit">
              <TabsTrigger
                value="thin"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200  hover:bg-gray-50"
              >
                Thin
              </TabsTrigger>
              <TabsTrigger
                value="normal"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                Normal
              </TabsTrigger>
              <TabsTrigger
                value="bold"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                Bold
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* align */}
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Horizontal Align</p>
          <Tabs
            onValueChange={(align: string) => {
              if (align === "left" || align === "center" || align === "right") {
                handlePropChange(selectedElement.id, selectedElement.type, {
                  horizontalAlign: align,
                });
              }
            }}
            value={selectedElement.props.horizontalAlign}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit">
              <TabsTrigger
                value="left"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200  hover:bg-gray-50"
              >
                <AlignLeft size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="center"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                <AlignCenter size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="right"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                <AlignRight size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Vertical Align</p>
          <Tabs
            onValueChange={(align: string) => {
              if (align === "top" || align === "middle" || align === "bottom") {
                handlePropChange(selectedElement.id, selectedElement.type, {
                  verticalAlign: align,
                });
              }
            }}
            value={selectedElement.props.verticalAlign}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit">
              <TabsTrigger
                value="top"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200  hover:bg-gray-50"
              >
                <AlignVerticalJustifyStartIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="middle"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                <AlignVerticalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="bottom"
                className="w-1/3 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                <AlignVerticalJustifyEndIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* fill */}
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Fill</p>
          <FillPicker
            background={selectedElement.props.fill ?? "black"}
            setBackground={(background) => {
              handlePropChange(selectedElement.id, selectedElement.type, {
                fill: background,
              });
            }}
          />
        </div>
        {/* background */}
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Background</p>
          <FillPicker
            background={selectedElement.props.background ?? "white"}
            setBackground={(background) => {
              handlePropChange(selectedElement.id, selectedElement.type, {
                background,
              });
            }}
          />
        </div>
        {/* shadow */}
        <div className="flex flex-col gap-1 ">
          <p className="text-muted-foreground">Shadow</p>
          <Tabs
            onValueChange={(shadow: string) => {
              if (shadow === "yes" || shadow === "no") {
                handlePropChange(selectedElement.id, selectedElement.type, {
                  shadow: shadow === "yes",
                });
              }
            }}
            value={selectedElement.props.shadow ? "yes" : "no"}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit">
              <TabsTrigger
                value="yes"
                className="w-1/2 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200  hover:bg-gray-50"
              >
                Yes
              </TabsTrigger>
              <TabsTrigger
                value="no"
                className="w-1/2 h-10 p-0 flex justify-center items-center data-[state=active]:bg-gray-200 hover:bg-gray-50"
              >
                No
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* padding-x */}
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Padding X</p>
          <Input
            id="size"
            type="number"
            onChange={(e) =>
              handlePropChange(selectedElement.id, selectedElement.type, {
                paddingX: Number(e.target.value),
              })
            }
            value={selectedElement.props.paddingX}
          />
        </div>
        {/* padding-y */}
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground">Padding Y</p>
          <Input
            id="size"
            type="number"
            onChange={(e) =>
              handlePropChange(selectedElement.id, selectedElement.type, {
                paddingY: Number(e.target.value),
              })
            }
            value={selectedElement.props.paddingY?.toString()}
          />
        </div>
      </div>
      // <div className="flex flex-col gap-2">
      //   <p className="text-muted-foreground">Color</p>
      //   <Input
      //     id="color"
      //     onChange={handleStyleChanges}
      //     value={selectedElement.style.color}
      //   />
      // </div>
      // <div className="flex gap-4">
      //   <div>
      //     <Label className="text-muted-foreground">Weight</Label>
      //     <Select
      //       onValueChange={(e) =>
      //         handleStyleChanges({
      //           target: {
      //             id: "font-weight",
      //             value: e,
      //           },
      //         })
      //       }
      //     >
      //       <SelectTrigger className="w-[180px]">
      //         <SelectValue placeholder="Select a weight" />
      //       </SelectTrigger>
      //       <SelectContent>
      //         <SelectGroup>
      //           <SelectLabel>Font Weights</SelectLabel>
      //           <SelectItem value="bold">Bold</SelectItem>
      //           <SelectItem value="normal">Regular</SelectItem>
      //           <SelectItem value="lighter">Light</SelectItem>
      //         </SelectGroup>
      //       </SelectContent>
      //     </Select>
      //   </div>
      //   <div>
      //     <Label className="text-muted-foreground">Size</Label>
      //     <Input
      //       placeholder="px"
      //       id="fontSize"
      //       onChange={handleStyleChanges}
      //       value={selectedElement.style.fontSize}
      //     />
      //   </div>
      // </div>
    );
  }
};
