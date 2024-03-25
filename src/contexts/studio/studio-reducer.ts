import {
  Editor,
  EditorHistory,
  Screen,
  ScreenLayout,
  ScreenLayoutType,
  StudioAction,
  StudioState,
} from "@/types";
import { Reducer } from "react";
import { initialScreenState, initialStudioState } from "./studio-constants";

const addEditorStateToHistory = (
  editorHistory: EditorHistory,
  newEditor: Editor
): EditorHistory => {
  const { history, current } = editorHistory;
  const updatedHistory = [...history.slice(0, current + 1), newEditor];
  return {
    history: updatedHistory,
    current: current + 1,
  };
};

const undo = (state: StudioState): StudioState => {
  if (
    state.editorHistory.history.length <= 1 ||
    state.editorHistory.current === 0
  ) {
    return state;
  }
  const newCurrent = state.editorHistory.current - 1;
  const newEditor = { ...state.editorHistory.history[newCurrent] };
  const updatedState: StudioState = {
    ...state,
    editor: newEditor,
    editorHistory: { ...state.editorHistory, current: newCurrent },
  };
  return updatedState;
};

const redo = (state: StudioState): StudioState => {
  if (state.editorHistory.history.length <= state.editorHistory.current + 1) {
    return state;
  }
  const newCurrent = state.editorHistory.current + 1;
  const newEditor = { ...state.editorHistory.history[newCurrent] };
  const updatedState: StudioState = {
    ...state,
    editor: newEditor,
    editorHistory: { ...state.editorHistory, current: newCurrent },
  };
  return updatedState;
};

const addScreen = (state: StudioState): StudioState => {
  const updatedEditor: Editor = {
    ...state.editor,
    screens: [...state.editor.screens, initialScreenState],
    selectedScreen: state.editor.selectedScreen + 1,
  };

  const updatedEditorHistory = addEditorStateToHistory(
    state.editorHistory,
    updatedEditor
  );

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
    editorHistory: updatedEditorHistory,
  };

  return updatedState;
};

const showDeleteScreenDialog = (
  state: StudioState,
  indexToDelete: number
): StudioState => {
  if (
    state.editor.requestedDeleteScreen !== null ||
    state.editor.screens.length < 2 ||
    indexToDelete >= state.editor.screens.length
  ) {
    return state;
  }

  const updatedState: StudioState = {
    ...state,
    editor: { ...state.editor, requestedDeleteScreen: indexToDelete },
  };

  return updatedState;
};

const cancelDeleteScreenDialog = (state: StudioState): StudioState => {
  if (state.editor.requestedDeleteScreen === null) {
    return state;
  }

  const updatedState: StudioState = {
    ...state,
    editor: { ...state.editor, requestedDeleteScreen: null },
  };

  return updatedState;
};

const deleteScreen = (state: StudioState, indexToDelete: number) => {
  if (
    state.editor.requestedDeleteScreen === null ||
    state.editor.screens.length < 2 ||
    indexToDelete >= state.editor.screens.length
  ) {
    return state;
  }

  const updatedEditor = {
    ...state.editor,
    screens: [
      ...state.editor.screens.filter((_, index) => index !== indexToDelete),
    ],
    selectedScreen: Math.max(indexToDelete - 1, 0),
    requestedDeleteScreen: null,
  };

  const updatedEditorHistory = addEditorStateToHistory(
    state.editorHistory,
    updatedEditor
  );

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
    editorHistory: updatedEditorHistory,
  };

  return updatedState;
};

const selectScreen = (
  state: StudioState,
  selectedScreen: number
): StudioState => {
  const updatedState: StudioState = {
    ...state,
    editor: { ...state.editor, selectedScreen },
  };

  return updatedState;
};

const makeNewLayout = (type: ScreenLayoutType): ScreenLayout => {
  const id = Math.floor(Math.random() * 10000).toString();
  const name = `New ${type} Layout`;
  switch (type) {
    case "SCREEN_LAYOUT_TYPE_FULL_SCREEN":
      return { id, name, type, component: null };
    case "SCREEN_LAYOUT_TYPE_POLAROID":
      return { id, name, type, title: "Edit me", component: null };
    case "SCREEN_LAYOUT_TYPE_BENTO_BOX":
      return { id, name, type, components: [] };
  }
};

const addLayoutToSelectedScreen = (
  state: StudioState,
  layoutType: ScreenLayoutType
): StudioState => {
  const newLayout = makeNewLayout(layoutType);
  const selectedScreenIndex = state.editor.selectedScreen;
  const updatedScreen: Screen = {
    ...state.editor.screens[selectedScreenIndex],
    layout: newLayout,
  };
  const updatedScreens = state.editor.screens.map((screen, index) =>
    index === selectedScreenIndex ? updatedScreen : screen
  );
  const updatedEditor: Editor = {
    ...state.editor,
    screens: updatedScreens,
  };

  const updatedEditorHistory = addEditorStateToHistory(
    state.editorHistory,
    updatedEditor
  );

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
    editorHistory: updatedEditorHistory,
  };

  return updatedState;
};

const updateTitleOfPolaroidLayout = (
  state: StudioState,
  titleText: string
): StudioState => {
  const selectedScreenIndex = state.editor.selectedScreen;
  const selectedScreen = state.editor.screens[selectedScreenIndex];
  const currentLayout = selectedScreen.layout;

  if (
    currentLayout === null ||
    currentLayout.type !== "SCREEN_LAYOUT_TYPE_POLAROID"
  ) {
    throw new Error(
      "Can not update title of layout that's not a Polaroid layout."
    );
  }

  const updatedLayout: ScreenLayout = { ...currentLayout, title: titleText };
  const updatedScreen: Screen = {
    ...state.editor.screens[selectedScreenIndex],
    layout: updatedLayout,
  };
  const updatedScreens = state.editor.screens.map((screen, index) =>
    index === selectedScreenIndex ? updatedScreen : screen
  );
  const updatedEditor: Editor = {
    ...state.editor,
    screens: updatedScreens,
  };

  const updatedEditorHistory = addEditorStateToHistory(
    state.editorHistory,
    updatedEditor
  );

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
    editorHistory: updatedEditorHistory,
  };

  return updatedState;
};

export const StudioReducer: Reducer<StudioState, StudioAction> = (
  state = initialStudioState,
  action
) => {
  switch (action.type) {
    case "UNDO":
      return undo(state);
    case "REDO":
      return redo(state);
    case "SELECT_SCREEN":
      return selectScreen(state, action.payload.index);
    case "ADD_SCREEN":
      return addScreen(state);
    case "REQUEST_DELETE_SCREEN":
      return showDeleteScreenDialog(state, action.payload.index);
    case "CANCEL_DELETE_SCREEN":
      return cancelDeleteScreenDialog(state);
    case "CONFIRM_DELETE_SCREEN":
      return deleteScreen(state, action.payload.index);
    case "ADD_LAYOUT_TO_SELECTED_SCREEN":
      return addLayoutToSelectedScreen(state, action.payload.layoutType);
    case "UPDATE_TITLE_OF_POLAROID_LAYOUT":
      return updateTitleOfPolaroidLayout(state, action.payload.titleText);
    default:
      return state;
  }
};
