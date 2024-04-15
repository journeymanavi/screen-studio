import { EDITOR_MODE_PREVIEW } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { ScreenComponentImage } from "@/types";
import { ImagePlusIcon } from "lucide-react";
import { ScreenElement } from "../screen-element";

export type ImageComponentProps = {
  element: ScreenComponentImage;
};

export const ImageComponent = ({ element }: ImageComponentProps) => {
  const { studioState } = useStudio();

  if (
    studioState.showPlayer ||
    studioState.editor.mode === EDITOR_MODE_PREVIEW
  ) {
    return (
      <img
        src={element.props.src}
        className="w-full h-full object-cover object-center"
      />
    );
  }

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
};
