import { useStudio } from "@/contexts/studio/studio-hook";
import { ScreenComponentImage } from "@/types";
import { ImagePlusIcon } from "lucide-react";
import { ScreenElement } from "../screen-element";

export type ImageComponentProps = {
  element: ScreenComponentImage;
};

export const ImageComponent = ({ element }: ImageComponentProps) => {
  const { studioState } = useStudio();

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <ScreenElement element={element}>
        {!element.props.src ? (
          <div className="h-full flex justify-center items-center w-full">
            <ImagePlusIcon className="text-gray-500" size={52} />
          </div>
        ) : (
          <img
            src={element.props.src}
            className="w-full h-full object-cover object-center"
          />
        )}
      </ScreenElement>
    );
  }

  return (
    <img
      src={element.props.src}
      className="w-full h-full object-cover object-center"
    />
  );
};
