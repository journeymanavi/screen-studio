import { EDITOR_MODE_PREVIEW, SCREEN_COMPONENT_TYPE_TEXT } from "@/constants";
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

  if (
    studioState.showPlayer ||
    studioState.editor.mode === EDITOR_MODE_PREVIEW
  ) {
    return (
      <div
        className="w-full h-full flex-1 flex"
        style={getCSSPropertiesFromTextComponentProps(element.props)}
      >
        {element.props.text}
      </div>
    );
  }

  return (
    <ScreenElement element={element}>
      <div
        ref={textElementRef}
        style={getCSSPropertiesFromTextComponentProps(element.props)}
        className="outline-none w-full h-full flex-1 flex"
        contentEditable="plaintext-only"
        onBlur={updateTextComponentProps}
      />
    </ScreenElement>
  );
};

function getCSSPropertiesFromTextComponentProps({
  size = 24,
  weight = "normal",
  fill = "black",
  background = "transparent",
  shadow = false,
  horizontalAlign = "left",
  verticalAlign = "middle",
  paddingX = 0,
  paddingY = 0,
}: ScreenComponentText["props"]): CSSProperties {
  const isGradientFill = /^linear-gradient/.test(fill);
  const isImageBackground = /(^url\([^)]+\)|gradient)/.test(background);
  return {
    fontSize: size,
    lineHeight: 1,
    fontWeight: weight === "thin" ? "100" : weight,
    color: isGradientFill ? "transparent" : fill,
    backgroundClip: isGradientFill ? "text" : undefined,
    backgroundColor:
      isGradientFill || isImageBackground ? "transparent" : background,
    backgroundImage: isGradientFill
      ? fill
      : isImageBackground
      ? background
      : undefined,
    textShadow: shadow ? "0px 0px 20px rgba(0,0,0,0.5)" : undefined,
    justifyContent:
      horizontalAlign === "left"
        ? "flex-start"
        : horizontalAlign === "right"
        ? "flex-end"
        : "center",
    alignItems:
      verticalAlign === "top"
        ? "flex-start"
        : verticalAlign === "bottom"
        ? "flex-end"
        : "center",
    paddingLeft: paddingX,
    paddingRight: paddingX,
    paddingTop: paddingY,
    paddingBottom: paddingY,
  };
}
