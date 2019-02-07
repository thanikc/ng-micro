import { Action } from '@ngrx/store';

import { StructureItem } from 'app/models/structure.interface';

export enum EStructureActions {
  GetStructure = '[Structure] Get Structure',
  GetStructureSuccess = '[Structure] Get Structure Success',
  GetStructureItem = '[Structure] Get Structure Item',
  GetStructureItemSuccess = '[Structure] Get Structure Item Success',
}

export class GetStructure implements Action {
  public readonly type = EStructureActions.GetStructure;
}

export class GetStructureSuccess implements Action {
  public readonly type = EStructureActions.GetStructureSuccess;
  constructor(public payload: StructureItem[]) { }
}

export class GetStructureItem implements Action {
  public readonly type = EStructureActions.GetStructureItem;
  constructor(public payload: string) { }
}

export class GetStructureItemSuccess implements Action {
  public readonly type = EStructureActions.GetStructureItemSuccess;
  constructor(public payload: StructureItem) { }
}

export type StructureActions = GetStructure | GetStructureSuccess | GetStructureItem | GetStructureItemSuccess;
