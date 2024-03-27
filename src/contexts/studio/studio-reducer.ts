import {
  Editor,
  EditorHistory,
  Screen,
  ScreenComponent,
  ScreenComponentType,
  ScreenLayout,
  ScreenLayoutType,
  StudioAction,
  StudioState,
} from "@/types";
import { CSSProperties, Reducer } from "react";
import { initialScreenState, initialStudioState } from "./studio-constants";

const getElementId = () => Math.floor(Math.random() * 10000).toString();

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
  const id = getElementId();
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

const makeNewComponent = (type: ScreenComponentType): ScreenComponent => {
  const id = getElementId();
  const name = `New ${type} Component`;
  switch (type) {
    case "SCREEN_COMPONENT_TYPE_TEXT":
      return {
        id,
        name,
        type,
        style: {
          display: "flex",
          flex: "1",
          justifyContent: "center",
          alignItems: "center",
        },
        props: { innerText: "Edit me..." },
      };
    case "SCREEN_COMPONENT_TYPE_IMAGE":
      return { id, name, type, style: {}, props: { src: "" } };
    case "SCREEN_COMPONENT_TYPE_VIDEO":
      return { id, name, type, style: {}, props: { src: "" } };
  }
};

const addComponentToFullScreenLayout = (
  state: StudioState,
  componentType: ScreenComponentType
): StudioState => {
  const selectedScreenIndex = state.editor.selectedScreen;
  const selectedScreen = state.editor.screens[selectedScreenIndex];
  const currentLayout = selectedScreen.layout;

  if (
    currentLayout === null ||
    currentLayout.type !== "SCREEN_LAYOUT_TYPE_FULL_SCREEN"
  ) {
    throw new Error(
      "Can not add component to a layout that's not a Full Screen layout."
    );
  }

  const updatedLayout: typeof currentLayout = {
    ...currentLayout,
    component: makeNewComponent(componentType),
  };
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

const selectScreenElement = (
  state: StudioState,
  element: ScreenComponent
): StudioState => {
  const updatedEditor: Editor = { ...state.editor, selectedElement: element };

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
  };

  return updatedState;
};

export const studioReducer: Reducer<StudioState, StudioAction> = (
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
    case "SELECT_SCREEN_ELEMENT":
      return selectScreenElement(state, action.payload.element);
    case "ADD_LAYOUT_TO_SELECTED_SCREEN":
      return addLayoutToSelectedScreen(state, action.payload.layoutType);
    case "UPDATE_TITLE_OF_POLAROID_LAYOUT":
      return updateTitleOfPolaroidLayout(state, action.payload.titleText);
    case "ADD_COMPONENT_TO_FULL_SCREEN_LAYOUT":
      return addComponentToFullScreenLayout(
        state,
        action.payload.componentType
      );
    case "UPDATE_SELECTED_COMPONENT_STYLE":
      return updateSelectedComponentStyle(state, action.payload.style);
    case "UPDATE_SELECTED_COMPONENT_PROPS":
      return updateSelectedComponentProps(state, action.payload.props);
    default:
      return state;
  }
};

function updateSelectedComponentStyle(
  state: StudioState,
  style: CSSProperties
): StudioState {
  if (state.editor.selectedElement?.type === "SCREEN_COMPONENT_TYPE_TEXT") {
    state.editor.selectedElement.style = style;
  }
  const updatedEditor: Editor = { ...state.editor };

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
}

function updateSelectedComponentProps(
  state: StudioState,
  props: ScreenComponent["props"]
): StudioState {
  if (state.editor.selectedElement?.type === "SCREEN_COMPONENT_TYPE_TEXT") {
    state.editor.selectedElement.props.innerText = (
      props as { innerText: string }
    ).innerText;
  }
  const updatedEditor: Editor = { ...state.editor };

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
}
