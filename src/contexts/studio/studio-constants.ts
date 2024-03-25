import {
  Editor,
  EditorHistory,
  EditorMode,
  Screen,
  StudioState,
} from "@/types";

export const initialEditorModeState: EditorMode = "EDITOR_MODE_EDIT";
export const initialScreenLayoutState: Screen["layout"] = null;
export const initialScreenAspectRatio: Screen["aspectRatio"] = "16:9";
export const initialScreenState: Screen = {
  layout: initialScreenLayoutState,
  aspectRatio: initialScreenAspectRatio,
};
export const initialScreensState = [initialScreenState];
export const initialSelectedScreenState = 0;
export const initialSelectedElementState = null;
export const initialRequestedDeleteScreen = null;

export const initialEditorState: Editor = {
  mode: initialEditorModeState,
  screens: initialScreensState,
  selectedScreen: initialSelectedScreenState,
  selectedElement: initialSelectedElementState,
  requestedDeleteScreen: initialRequestedDeleteScreen,
};

export const initialEditorHistoryState: EditorHistory = {
  history: [initialEditorState],
  current: 0,
};

export const initialStudioState: StudioState = {
  editor: initialEditorState,
  editorHistory: initialEditorHistoryState,
};
