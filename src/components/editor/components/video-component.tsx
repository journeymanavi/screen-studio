import { EDITOR_MODE_PREVIEW } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { ScreenComponentVideo } from "@/types";
import { VideoIcon } from "lucide-react";
import { ScreenElement } from "../screen-element";

export type VideoComponentProps = {
  element: ScreenComponentVideo;
};

export const VideoComponent = ({ element }: VideoComponentProps) => {
  const { studioState } = useStudio();

  if (
    studioState.showPlayer ||
    studioState.editor.mode === EDITOR_MODE_PREVIEW
  ) {
    return (
      <video
        src={element.props.src}
        autoPlay={true}
        loop={element.props.loop ?? false}
        className="w-full h-full object-cover object-center"
      />
    );
  }

  return (
    <ScreenElement element={element}>
      {!element.props.src ? (
        <div className="h-full flex justify-center items-center w-full">
          <VideoIcon className="text-gray-500" size={52} />
        </div>
      ) : (
        <video
          src={element.props.src}
          autoPlay={true}
          loop={element.props.loop ?? false}
          className="w-full h-full object-cover object-center"
        />
      )}
    </ScreenElement>
  );
};
