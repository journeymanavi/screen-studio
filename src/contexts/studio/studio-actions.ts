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
      type: "";
    };
