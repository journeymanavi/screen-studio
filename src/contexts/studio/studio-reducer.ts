import { Reducer } from "react";
import { StudioAction } from "./studio-actions";
import { initialStudioState } from "./studio-constants";
import { Editor, EditorHistory, StudioState } from "./types";

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

const addScreen = (state: StudioState): StudioState => {
  const updatedEditor: Editor = {
    ...state.editor,
    screens: [
      ...state.editor.screens,
      {
        layout: null,
      },
    ],
    selectedScreen: state.editor.selectedScreen + 1,
  };

  const updatedEditorHistory = addEditorStateToHistory(
    state.editorHistory,
    updatedEditor
  );

  const updatedStudioState: StudioState = {
    ...state,
    editor: updatedEditor,
    editorHistory: updatedEditorHistory,
  };

  return updatedStudioState;
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

  const updatedState: StudioState = {
    ...state,
    editor: {
      ...state.editor,
      screens: [
        ...state.editor.screens.filter((_, index) => index !== indexToDelete),
      ],
      selectedScreen: Math.max(indexToDelete - 1, 0),
      requestedDeleteScreen: null,
    },
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

export const StudioReducer: Reducer<StudioState, StudioAction> = (
  state = initialStudioState,
  action
) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
