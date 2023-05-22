import { createReducer, on } from '@ngrx/store';
import { UnitActions, UnitApiActions } from './units.action';
import { UnitState } from '../models/unit-state.model';

export const initialState: UnitState = {
  unitList: [],
  filteredUnitList: [],
  selectedAge: 'All',
  selectedCosts: [],
  selectedUnit: null,
};

export const unitsReducer = createReducer(
  initialState,
  on(UnitApiActions.retrievedUnitList, (state, { units }) => ({
    ...state,
    unitList: units,
    filteredUnitList: units,
  })),
  on(UnitActions.filteredUnitList, (state, { filteredUnits }) => ({
    ...state,
    filteredUnitList: filteredUnits,
  })),
  on(UnitActions.selectAge, (state, { age }) => ({
    ...state,
    selectedAge: age,
  })),
  on(UnitActions.selectCosts, (state, { cost }) => ({
    ...state,
    selectedCosts: state.selectedCosts.some((c) => c.material === cost.material)
      ? state.selectedCosts.filter((c) => c.material !== cost.material)
      : [...state.selectedCosts, cost],
  })),
  on(UnitActions.selectCostValue, (state, { cost }) => ({
    ...state,
    selectedCosts: state.selectedCosts.map((c) =>
      c.material === cost.material ? cost : c
    ),
  })),
  on(UnitActions.selectUnit, (state, { unit }) => ({
    ...state,
    selectedUnit: unit,
  }))
);
