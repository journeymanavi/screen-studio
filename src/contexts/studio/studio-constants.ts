import { ROUTE_PATTERN_PLAYER } from "@/constants";
import {
  Editor,
  EditorHistory,
  EditorMode,
  Screen,
  StudioState,
} from "@/types";
import { getElementId } from "./studio-reducer";

export const initialEditorModeState: EditorMode = "EDITOR_MODE_EDIT";
export const initialScreenLayoutState: Screen["layout"] = null;
export const initialScreenAspectRatio: Screen["aspectRatio"] = "16:9";
export const initialScreenState: Screen = {
  id: getElementId(),
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
  route: window.location.pathname,
  editor: initialEditorState,
  player: { screenSpec: null },
  showPlayer: ROUTE_PATTERN_PLAYER.test(window.location.pathname),
  editorHistory: initialEditorHistoryState,
};
