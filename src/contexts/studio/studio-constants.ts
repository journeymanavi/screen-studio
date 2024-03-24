import { Editor, EditorHistory, StudioState } from "./types";

export const SCREEN_COMPONENT_TYPE_TEXT = "SCREEN_COMPONENT_TYPE_TEXT";
export const SCREEN_COMPONENT_TYPE_IMAGE = "SCREEN_COMPONENT_TYPE_IMAGE";
export const SCREEN_COMPONENT_TYPE_VIDEO = "SCREEN_COMPONENT_VIDEO";
export const SCREEN_LAYOUT_TYPE_FULL_SCREEN = "SCREEN_LAYOUT_TYPE_FULL_SCREEN";
export const SCREEN_LAYOUT_TYPE_POLAROID = "SCREEN_LAYOUT_TYPE_POLAROID";
export const SCREEN_LAYOUT_TYPE_BENTO_BOX = "SCREEN_LAYOUT_TYPE_BENTO_BOX";
export const STUDIO_MODE_EDIT = "STUDIO_MODE_EDIT";
export const STUDIO_MODE_PREVIEW = "STUDIO_MODE_PREVIEW";

export const initialEditorState: Editor = {
  mode: "STUDIO_MODE_EDIT",
  screens: [
    {
      layout: null,
    },
  ],
  selectedScreen: 0,
  selectedElement: null,
  requestedDeleteScreen: null,
};

export const initialEditorHistoryState: EditorHistory = {
  history: [initialEditorState],
  current: 0,
};

export const initialStudioState: StudioState = {
  editor: initialEditorState,
  editorHistory: initialEditorHistoryState,
};
