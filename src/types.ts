import {
  EDITOR_MODE_EDIT,
  EDITOR_MODE_PREVIEW,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import { CSSProperties, Dispatch } from "react";

// Component ------------------------------------------------------------------

export type ScreenComponentTypeText = typeof SCREEN_COMPONENT_TYPE_TEXT;
export type ScreenComponentTypeImage = typeof SCREEN_COMPONENT_TYPE_IMAGE;
export type ScreenComponentTypeVideo = typeof SCREEN_COMPONENT_TYPE_VIDEO;

export type ScreenComponentType =
  | ScreenComponentTypeText
  | ScreenComponentTypeImage
  | ScreenComponentTypeVideo;

export type ScreenComponentText = {
  id: string;
  name: string;
  type: ScreenComponentTypeText;
  style: CSSProperties;
  props: {
    innerText?: string;
  };
};

export type ScreenComponentImage = {
  id: string;
  name: string;
  type: ScreenComponentTypeImage;
  style: CSSProperties;
  props: {
    src?: string;
  };
};

export type ScreenComponentVideo = {
  id: string;
  name: string;
  type: ScreenComponentTypeVideo;
  style: CSSProperties;
  props: {
    src?: string;
  };
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

export type ScreenLayoutFullScreen = {
  id: string;
  name: string;
  type: ScreenLayoutTypeFullScreen;
  component: ScreenComponent | null;
};

export type ScreenLayoutPolaroid = {
  id: string;
  name: string;
  type: ScreenLayoutTypePolaroid;
  title: string;
  component: ScreenComponent | null;
};

export type ScreenLayoutBentoBox = {
  id: string;
  name: string;
  type: ScreenLayoutTypeBentoBox;
  components: ScreenComponent[];
};

export type ScreenLayout =
  | ScreenLayoutFullScreen
  | ScreenLayoutPolaroid
  | ScreenLayoutBentoBox;

// Screen ---------------------------------------------------------------------

export type ScreenAspectRatio16IsTo9 = "16:9";
export type ScreenAspectRatio4IsTo3 = "4:3";

export type ScreenAspectRatio =
  | ScreenAspectRatio16IsTo9
  | ScreenAspectRatio4IsTo3;

export type Screen = {
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

export type EditorHistory = {
  history: Editor[];
  current: number;
};

export type StudioState = {
  editor: Editor;
  editorHistory: EditorHistory;
};

export type StudioAction =
  | {
      type: "UNDO";
    }
  | {
      type: "REDO";
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
      type: "SELECT_SCREEN_ELEMENT";
      payload: {
        element: ScreenComponent;
      };
    }
  | {
      type: "ADD_LAYOUT_TO_SELECTED_SCREEN";
      payload: {
        layoutType: ScreenLayoutType;
      };
    }
  | {
      type: "ADD_COMPONENT_TO_FULL_SCREEN_LAYOUT";
      payload: {
        componentType: ScreenComponentType;
      };
    }
  | {
      type: "ADD_COMPONENT_TO_POLAROID_LAYOUT";
      payload: {
        componentType: ScreenComponentType;
      };
    }
  | {
      type: "UPDATE_TITLE_OF_POLAROID_LAYOUT";
      payload: {
        titleText: string;
      };
    }
  | {
      type: "ADD_COMPONENT_TO_BENTO_BOX_LAYOUT";
      payload: {
        componentType: ScreenComponentType;
        slotIndex: number;
      };
    }
  | {
      type: "UPDATE_SELECTED_COMPONENT_STYLE";
      payload: {
        style: CSSProperties;
      };
    }
  | {
      type: "UPDATE_SELECTED_COMPONENT_PROPS";
      payload: {
        props: ScreenComponent["props"];
      };
    }
  | {
      type: "UPDATE_SCREEN_ASPECT_RATIO";
      payload: {
        aspectRatio: ScreenAspectRatio;
      };
    };

export type StudioContextValue = {
  studioState: StudioState;
  dispatch: Dispatch<StudioAction>;
};
