import { StructureItem } from 'app/models/structure.interface';

export interface StructureState {
  items: StructureItem[];
  selectedItem?: StructureItem;
}

export const initialStructureState: StructureState = {
  items: [],
  selectedItem: null,
};
