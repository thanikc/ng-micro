import { StructureState, initialStructureState } from '../state/structure.state';
import { StructureActions, EStructureActions } from '../actions/structure.action';

export function structureReducers(state = initialStructureState, action: StructureActions): StructureState {
  switch (action.type) {
    case EStructureActions.GetStructureSuccess: {
      return {
        ...state,
        items: action.payload
      };
    }
    case EStructureActions.GetStructureItemSuccess: {
      return {
        ...state,
        selectedItem: action.payload
      };
    }

    default:
      return state;
  }
};
