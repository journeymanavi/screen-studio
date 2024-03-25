import { StudioProvider } from "../contexts/studio/studio-provider";
import { Editor } from "./editor/editor";

function ScreenStudio() {
  return (
    <StudioProvider>
      <Editor />
    </StudioProvider>
  );
}

export default ScreenStudio;
