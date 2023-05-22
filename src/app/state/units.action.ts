import { createActionGroup, props } from '@ngrx/store';
import { Unit } from '../models/unit.model';
import { SelectedCost } from '../models/selected-cost.model';

export const UnitApiActions = createActionGroup({
  source: 'Units API',
  events: {
    'Retrieved Unit List': props<{ units: ReadonlyArray<Unit> }>(),
  },
});

export const UnitActions = createActionGroup({
  source: 'Units',
  events: {
    'Filtered Unit List': props<{ filteredUnits: Array<Unit> }>(),
    'Select Age': props<{ age: string }>(),
    'Select Costs': props<{ cost: SelectedCost }>(),
    'Select Cost Value': props<{ cost: SelectedCost }>(),
    'Select Unit': props<{ unit: Unit }>(),
  },
});
