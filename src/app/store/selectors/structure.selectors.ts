import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { StructureState } from '../state/structure.state';

const selectStructure = (state: AppState) => state.structure;

export const selectItems = createSelector(
  selectStructure,
  (state: StructureState) => state.items
);

export const selectSelectedItem = createSelector(
  selectStructure,
  (state: StructureState) => state.selectedItem
);
