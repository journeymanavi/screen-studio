import { useStudio } from "@/contexts/studio/studio-hook";
import { HTMLAttributes } from "react";

export const TextComponent = (props: HTMLAttributes<HTMLDivElement>) => {
  const { studioState } = useStudio();

  console.log("TextComponent", props);

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <span>some text</span>
      // <div {...props} title="something" contentEditable="plaintext-only" />
    );
  }

  return <span>default text</span>;

  // return <div {...props} />;
};
