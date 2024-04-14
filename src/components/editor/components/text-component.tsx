import { SCREEN_COMPONENT_TYPE_TEXT } from "@/constants";
import { useStudio } from "@/contexts/studio/studio-hook";
import { ScreenComponentText } from "@/types";
import {
  CSSProperties,
  FocusEventHandler,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ScreenElement } from "../screen-element";

export type TextComponentProps = {
  element: ScreenComponentText;
};

export const TextComponent = ({ element }: TextComponentProps) => {
  const { studioState, dispatch } = useStudio();

  const updateTextComponentProps: FocusEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        dispatch({
          type: "UPDATE_ELEMENT_PROPS",
          payload: {
            elementId: element.id,
            elementType: SCREEN_COMPONENT_TYPE_TEXT,
            props: {
              text: e.currentTarget.innerText ?? "",
            },
          },
        });
      },
      [dispatch, element.id]
    );

  const textElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      textElementRef.current &&
      textElementRef.current.innerText !== element.props.text
    ) {
      textElementRef.current.innerText = element.props.text ?? "";
    }
  }, [element.props.text]);

  if (studioState.editor.mode === "EDITOR_MODE_EDIT") {
    return (
      <ScreenElement element={element}>
        <div
          ref={textElementRef}
          style={getCSSPropertiesFromTextComponentProps(element.props)}
          className="outline-none w-full h-full flex-1 flex justify-center items-center"
          contentEditable="plaintext-only"
          onBlur={updateTextComponentProps}
        />
      </ScreenElement>
    );
  }

  return (
    <div style={getCSSPropertiesFromTextComponentProps(element.props)}>
      {element.props.text}
    </div>
  );
};

function getCSSPropertiesFromTextComponentProps({
  size = 24,
  wight = "normal",
  fill = "black",
  background = "transparent",
  shadow = false,
}: ScreenComponentText["props"]): CSSProperties {
  const isGradientFill = /^linear-gradient/.test(fill);
  const isImageBackground = /^url\([^)]+\)/.test(background);
  return {
    fontSize: size,
    fontWeight: wight,
    color: isGradientFill ? "transparent" : fill,
    backgroundClip: isGradientFill ? "text" : undefined,
    backgroundColor:
      isGradientFill || isImageBackground ? "transparent" : background,
    backgroundImage: isGradientFill
      ? fill
      : isImageBackground
      ? background
      : undefined,
    textShadow: shadow ? "0px 0px 5px rgba(0,0,0,0.5)" : undefined,
  };
}
