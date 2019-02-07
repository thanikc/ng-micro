import { RouterReducerState } from '@ngrx/router-store';
import { StructureState, initialStructureState } from './structure.state';

export interface AppState {
  router?: RouterReducerState;
  structure: StructureState;
}

export const initialAppState: AppState = {
  structure: initialStructureState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
