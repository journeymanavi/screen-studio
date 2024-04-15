import { StudioProvider } from "../contexts/studio/studio-provider";
import { Router } from "./router";

function ScreenStudio() {
  return (
    <StudioProvider>
      <Router />
    </StudioProvider>
  );
}

export default ScreenStudio;
