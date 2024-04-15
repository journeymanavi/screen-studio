import {
  ASPECT_RATIO_16_IS_TO_9,
  ASPECT_RATIO_4_IS_TO_3,
  EDITOR_MODE_EDIT,
  EDITOR_MODE_PREVIEW,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { Dispatch } from "react";

// Screen Element -------------------------------------------------------------

type ScreenElement<
  ScreenElementType extends ScreenComponentType | ScreenLayoutType
> = {
  id: string;
  name: string;
  type: ScreenElementType;
};

// Component ------------------------------------------------------------------

export type ScreenComponentTypeText = typeof SCREEN_COMPONENT_TYPE_TEXT;
export type ScreenComponentTypeImage = typeof SCREEN_COMPONENT_TYPE_IMAGE;
export type ScreenComponentTypeVideo = typeof SCREEN_COMPONENT_TYPE_VIDEO;

export type ScreenComponentType =
  | ScreenComponentTypeText
  | ScreenComponentTypeImage
  | ScreenComponentTypeVideo;

export type ScreenComponentTextProps = {
  text?: string;
  size?: number;
  weight?: "thin" | "normal" | "bold";
  horizontalAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  fill?: string;
  background?: string;
  shadow?: boolean;
  paddingX?: number;
  paddingY?: number;
};

export type ScreenComponentText = ScreenElement<ScreenComponentTypeText> & {
  props: ScreenComponentTextProps;
};

export type ScreenComponentImageProps = {
  src?: string;
};

export type ScreenComponentImage = ScreenElement<ScreenComponentTypeImage> & {
  props: ScreenComponentImageProps;
};

export type ScreenComponentVideoProps = {
  src?: string;
  loop?: boolean;
};

export type ScreenComponentVideo = ScreenElement<ScreenComponentTypeVideo> & {
  props: ScreenComponentVideoProps;
};

export type ScreenComponent =
  | ScreenComponentText
  | ScreenComponentImage
  | ScreenComponentVideo;

// Layout ---------------------------------------------------------------------

export type ScreenLayoutTypeFullScreen = typeof SCREEN_LAYOUT_TYPE_FULL_SCREEN;
export type ScreenLayoutTypePolaroid = typeof SCREEN_LAYOUT_TYPE_POLAROID;
export type ScreenLayoutTypeBentoBox = typeof SCREEN_LAYOUT_TYPE_BENTO_BOX;

export type ScreenLayoutType =
  | ScreenLayoutTypeFullScreen
  | ScreenLayoutTypePolaroid
  | ScreenLayoutTypeBentoBox;

export type ScreenLayoutFullScreenProps = {
  component: ScreenComponent | null;
};

export type ScreenLayoutFullScreen =
  ScreenElement<ScreenLayoutTypeFullScreen> & {
    props: ScreenLayoutFullScreenProps;
  };

export type ScreenLayoutPolaroidProps = {
  title: string;
  component: ScreenComponent | null;
};

export type ScreenLayoutPolaroid = ScreenElement<ScreenLayoutTypePolaroid> & {
  props: ScreenLayoutPolaroidProps;
};

export type ScreenLayoutBentoBoxProps = {
  components: ScreenComponent[];
};

export type ScreenLayoutBentoBox = ScreenElement<ScreenLayoutTypeBentoBox> & {
  props: ScreenLayoutBentoBoxProps;
};

export type ScreenLayout =
  | ScreenLayoutFullScreen
  | ScreenLayoutPolaroid
  | ScreenLayoutBentoBox;

// Screen Element Props -------------------------------------------------------

export type ScreenElementType = ScreenLayoutType | ScreenComponentType;

export type ScreenElementProps<
  T extends ScreenElementType = ScreenElementType
> = T extends ScreenLayoutTypeFullScreen
  ? ScreenLayoutFullScreenProps
  : T extends ScreenLayoutTypePolaroid
  ? ScreenLayoutPolaroidProps
  : T extends ScreenLayoutTypeBentoBox
  ? ScreenLayoutBentoBoxProps
  : T extends ScreenComponentTypeText
  ? ScreenComponentTextProps
  : T extends ScreenComponentTypeImage
  ? ScreenComponentImageProps
  : T extends ScreenComponentTypeVideo
  ? ScreenComponentVideoProps
  : never;

// Screen ---------------------------------------------------------------------

export type ScreenAspectRatio16IsTo9 = typeof ASPECT_RATIO_16_IS_TO_9;
export type ScreenAspectRatio4IsTo3 = typeof ASPECT_RATIO_4_IS_TO_3;

export type ScreenAspectRatio =
  | ScreenAspectRatio16IsTo9
  | ScreenAspectRatio4IsTo3;

export type Screen = {
  id: string;
  layout: ScreenLayout | null;
  aspectRatio: ScreenAspectRatio;
};

// Editor ---------------------------------------------------------------------

export type EditorModeEdit = typeof EDITOR_MODE_EDIT;
export type EditorModePreview = typeof EDITOR_MODE_PREVIEW;

export type EditorMode = EditorModeEdit | EditorModePreview;

export type Editor = {
  mode: EditorMode;
  screens: Screen[];
  selectedScreen: number;
  selectedElement: ScreenLayout | ScreenComponent | null;
  requestedDeleteScreen: number | null;
};

// Studio ---------------------------------------------------------------------

export type Player = {
  screenSpec: Screen | null;
};

export type EditorHistory = {
  history: Editor[];
  current: number;
};

export type StudioState = {
  route: string;
  showPlayer: boolean;
  player: Player;
  editor: Editor;
  editorHistory: EditorHistory;
};

export type StudioAction =
  | { type: "NAVIGATE"; payload: { route: string } }
  | { type: "UPDATE_PLAYER_SCREEN_SPEC"; payload: { screenSpec: Screen } }
  | {
      type: "UNDO";
    }
  | {
      type: "REDO";
    }
  | {
      type: "SWITCH_TO_PREVIEW_MODE";
    }
  | {
      type: "SWITCH_TO_EDIT_MODE";
    }
  | {
      type: "SELECT_SCREEN";
      payload: {
        index: number;
      };
    }
  | {
      type: "ADD_SCREEN";
    }
  | {
      type: "REQUEST_DELETE_SCREEN";
      payload: {
        index: number;
      };
    }
  | {
      type: "CANCEL_DELETE_SCREEN";
    }
  | {
      type: "CONFIRM_DELETE_SCREEN";
      payload: {
        index: number;
      };
    }
  | {
      type: "UPDATE_SCREEN_ASPECT_RATIO";
      payload: {
        aspectRatio: ScreenAspectRatio;
      };
    }
  | {
      type: "ADD_LAYOUT_TO_SELECTED_SCREEN";
      payload: {
        layoutType: ScreenLayoutType;
      };
    }
  | {
      type: "SELECT_ELEMENT";
      payload: {
        element: Editor["selectedElement"];
      };
    }
  | {
      type: "UPDATE_ELEMENT_PROPS";
      payload: UpdateElementPropsActionPayload;
    };

export type UpdateElementPropsActionPayload =
  | {
      elementId: string;
      elementType: ScreenLayoutTypeFullScreen;
      props: ScreenElementProps<ScreenLayoutTypeFullScreen>;
    }
  | {
      elementId: string;
      elementType: ScreenLayoutTypePolaroid;
      props: ScreenElementProps<ScreenLayoutTypePolaroid>;
    }
  | {
      elementId: string;
      elementType: ScreenLayoutTypeBentoBox;
      props: ScreenElementProps<ScreenLayoutTypeBentoBox>;
    }
  | {
      elementId: string;
      elementType: ScreenComponentTypeText;
      props: ScreenElementProps<ScreenComponentTypeText>;
    }
  | {
      elementId: string;
      elementType: ScreenComponentTypeImage;
      props: ScreenElementProps<ScreenComponentTypeImage>;
    }
  | {
      elementId: string;
      elementType: ScreenComponentTypeVideo;
      props: ScreenElementProps<ScreenComponentTypeVideo>;
    };

export type StudioContextValue = {
  studioState: StudioState;
  dispatch: Dispatch<StudioAction>;
};
