import {
  SCREEN_COMPONENT_TYPE_IMAGE,
  SCREEN_COMPONENT_TYPE_TEXT,
  SCREEN_COMPONENT_TYPE_VIDEO,
  SCREEN_LAYOUT_TYPE_FULL_SCREEN,
  SCREEN_LAYOUT_TYPE_POLAROID,
} from "@/constants";
import {
  Editor,
  EditorHistory,
  Screen,
  ScreenAspectRatio,
  ScreenComponent,
  ScreenComponentType,
  ScreenLayout,
  ScreenLayoutType,
  StudioAction,
  StudioState,
  UpdateElementPropsActionPayload,
} from "@/types";
import { Reducer } from "react";
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

const selectScreen = (
  state: StudioState,
  selectedScreen: number
): StudioState => {
  const updatedState: StudioState = {
    ...state,
    editor: {
      ...state.editor,
      selectedScreen,
      selectedElement: null,
    },
  };

  return updatedState;
};

const addScreen = (state: StudioState): StudioState => {
  const updatedEditor: Editor = {
    ...state.editor,
    screens: [
      ...state.editor.screens,
      { ...initialScreenState, id: getElementId() },
    ],
    selectedScreen: state.editor.selectedScreen + 1,
    selectedElement: null,
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

const confirmDeleteScreen = (state: StudioState, indexToDelete: number) => {
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
    selectScreenElement: null,
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

function updateScreenAspectRatio(
  state: StudioState,
  aspectRatio: ScreenAspectRatio
): StudioState {
  const selectedScreenIndex = state.editor.selectedScreen;
  const updatedScreens = state.editor.screens.map((screen, index) =>
    index === selectedScreenIndex ? { ...screen, aspectRatio } : screen
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
}

const addLayoutToSelectedScreen = (
  state: StudioState,
  layoutType: ScreenLayoutType
): StudioState => {
  const id = getElementId();
  let newLayout: ScreenLayout;
  switch (layoutType) {
    case "SCREEN_LAYOUT_TYPE_FULL_SCREEN":
      newLayout = {
        id,
        name: "Full Screen Layout",
        type: layoutType,
        props: { component: null },
      };
      break;
    case "SCREEN_LAYOUT_TYPE_POLAROID":
      newLayout = {
        id,
        name: "Polaroid Layout",
        type: layoutType,
        props: { title: "Edit me", component: null },
      };
      break;
    case "SCREEN_LAYOUT_TYPE_BENTO_BOX":
      newLayout = {
        id,
        name: "Bento Box Layout",
        type: layoutType,
        props: { components: [] },
      };
      break;
  }

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
    selectedElement: newLayout,
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

export const makeNewComponent = (
  type: ScreenComponentType
): ScreenComponent => {
  const id = getElementId();
  switch (type) {
    case "SCREEN_COMPONENT_TYPE_TEXT":
      return {
        id,
        name: "Text",
        type,
        props: {
          text: "Edit me...",
          background: "transparent",
          fill: "black",
          shadow: true,
          size: 48,
          weight: "normal",
          align: "left",
          paddingX: 0,
          paddingY: 0,
        },
      };
    case "SCREEN_COMPONENT_TYPE_IMAGE":
      return { id, name: "Image", type, props: { src: "" } };
    case "SCREEN_COMPONENT_TYPE_VIDEO":
      return {
        id,
        name: "Video",
        type,
        props: { src: "", loop: true },
      };
  }
};

const selectScreenElement = (
  state: StudioState,
  element: Editor["selectedElement"]
): StudioState => {
  const updatedEditor: Editor = { ...state.editor, selectedElement: element };

  const updatedState: StudioState = {
    ...state,
    editor: updatedEditor,
  };

  return updatedState;
};

function updateElementProps(
  state: StudioState,
  payload: UpdateElementPropsActionPayload
): StudioState {
  // console.log("updateSelectedElementProps", state, payload);
  const { elementId, elementType, props } = payload;
  const selectedScreen = state.editor.screens[state.editor.selectedScreen];

  if (selectedScreen.layout === null) {
    return state;
  }

  let updatedSelectedScreen = { ...selectedScreen };
  let updatedSelectedElement = state.editor.selectedElement;

  if (
    elementType === SCREEN_LAYOUT_TYPE_FULL_SCREEN ||
    elementType === SCREEN_LAYOUT_TYPE_POLAROID
  ) {
    if (selectedScreen.layout?.type !== elementType) {
      throw new Error(
        `Invalid Element Type ${elementType} passed for updating element props!`
      );
    }

    updatedSelectedScreen = {
      ...selectedScreen,
      layout: {
        ...selectedScreen.layout,
        props: {
          ...selectedScreen.layout?.props,
          ...props,
        },
      },
    } as Screen;
  }

  if (
    elementType === SCREEN_COMPONENT_TYPE_TEXT ||
    elementType === SCREEN_COMPONENT_TYPE_IMAGE ||
    elementType === SCREEN_COMPONENT_TYPE_VIDEO
  ) {
    if (state.editor.selectedElement?.type !== elementType) {
      throw new Error(
        `Invalid Element Type ${elementType} passed for updating element props!`
      );
    }

    if (
      selectedScreen.layout.type === SCREEN_LAYOUT_TYPE_FULL_SCREEN ||
      selectedScreen.layout.type === SCREEN_LAYOUT_TYPE_POLAROID
    ) {
      const targetComponent = selectedScreen.layout.props.component;

      if (targetComponent === null) {
        return state;
      }

      if (
        targetComponent.id !== elementId ||
        targetComponent.type !== elementType
      ) {
        throw new Error(
          `Invalid Element Type ${elementType} with id ${elementId} passed for updating element props!`
        );
      }

      const updatedComponent = {
        ...targetComponent,
        props: {
          ...targetComponent.props,
          ...props,
        },
      } as ScreenComponent;

      updatedSelectedScreen = {
        ...selectedScreen,
        layout: {
          ...selectedScreen.layout,
          props: {
            ...selectedScreen.layout?.props,
            component: updatedComponent,
          },
        },
      } as Screen;

      updatedSelectedElement = updatedComponent;
    }
  }

  let updatedEditor: Editor | null = { ...state.editor };
  const updatedScreens = [...state.editor.screens];
  updatedScreens[state.editor.selectedScreen] = updatedSelectedScreen;
  updatedEditor = {
    ...state.editor,
    screens: updatedScreens,
    selectedElement: updatedSelectedElement,
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

  // console.log({ state, updatedState });

  return updatedState;
}

export const studioReducer: Reducer<StudioState, StudioAction> = (
  state = initialStudioState,
  action
) => {
  // console.log("studioReducer", action);

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
      return confirmDeleteScreen(state, action.payload.index);
    case "UPDATE_SCREEN_ASPECT_RATIO":
      return updateScreenAspectRatio(state, action.payload.aspectRatio);
    case "ADD_LAYOUT_TO_SELECTED_SCREEN":
      return addLayoutToSelectedScreen(state, action.payload.layoutType);
    case "SELECT_ELEMENT":
      return selectScreenElement(state, action.payload.element);
    case "UPDATE_ELEMENT_PROPS":
      return updateElementProps(state, action.payload);
    default:
      return state;
  }
};
