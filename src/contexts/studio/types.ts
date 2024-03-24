import { Dispatch } from "react";
import { StudioAction } from "./studio-actions";
import {
  STUDIO_MODE_EDIT as EDITOR_MODE_EDIT,
  STUDIO_MODE_PREVIEW as EDITOR_MODE_PREVIEW,
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_BENTO_BOX,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "./studio-constants";

export type ScreenComponentType =
  | typeof SCREEN_COMPONENT_TYPE_TEXT
  | typeof SCREEN_COMPONENT_TYPE_IMAGE
  | typeof SCREEN_COMPONENT_TYPE_VIDEO;

export type ScreenComponent =
  | { type: typeof SCREEN_COMPONENT_TYPE_TEXT }
  | { type: typeof SCREEN_COMPONENT_TYPE_IMAGE }
  | { type: typeof SCREEN_COMPONENT_TYPE_VIDEO };

export type ScreenLayoutType =
  | typeof SCREEN_LAYOUT_TYPE_FULL_SCREEN
  | typeof SCREEN_LAYOUT_TYPE_POLAROID
  | typeof SCREEN_LAYOUT_TYPE_BENTO_BOX;

export type ScreenLayout =
  | {
      type: typeof SCREEN_LAYOUT_TYPE_FULL_SCREEN;
      component: ScreenComponent | null;
    }
  | {
      type: typeof SCREEN_LAYOUT_TYPE_POLAROID;
      title: string;
      component: ScreenComponent | null;
    }
  | {
      type: typeof SCREEN_LAYOUT_TYPE_BENTO_BOX;
      components: ScreenComponent[];
    };

export type Screen = {
  layout: ScreenLayout | null;
};

export type Editor = {
  mode: typeof EDITOR_MODE_EDIT | typeof EDITOR_MODE_PREVIEW;
  screens: Screen[];
  selectedScreen: number;
  selectedElement: ScreenLayout | ScreenComponent | null;
  requestedDeleteScreen: number | null;
};

export type EditorHistory = {
  history: Editor[];
  current: number;
};

export type StudioState = {
  editor: Editor;
  editorHistory: EditorHistory;
};

export type StudioContextValue = {
  studioState: StudioState;
  dispatch: Dispatch<StudioAction>;
};
