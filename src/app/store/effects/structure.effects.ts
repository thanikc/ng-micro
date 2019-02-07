import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, withLatestFrom, switchMap } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import { StructureService } from 'app/services/structure.service';
import {
  EStructureActions,
  GetStructureItem,
  GetStructureItemSuccess,
  GetStructure,
  GetStructureSuccess
} from '../actions/structure.action';
import { selectItems } from '../selectors/structure.selectors';
import { of } from 'rxjs';
import { StructureHttp } from 'app/models/http/structure-http.interface';

@Injectable()
export class StructureEffects {
  @Effect()
  getStructureItem$ = this.actions$.pipe(
    ofType<GetStructureItem>(EStructureActions.GetStructureItem),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectItems))),
    switchMap(([id, structure]) => {
      const selectedItem = structure.filter(item => item.id === id)[0];
      return of(new GetStructureItemSuccess(selectedItem));
    }),
  );

  @Effect()
  getStructure$ = this.actions$.pipe(
    ofType<GetStructure>(EStructureActions.GetStructure),
    switchMap(() => this.structureService.getStructure()),
    switchMap((structureHttp: StructureHttp) => of(new GetStructureSuccess(structureHttp.structure)))
  );

  constructor(
    private structureService: StructureService,
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }
}
