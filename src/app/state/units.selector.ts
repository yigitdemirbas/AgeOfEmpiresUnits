import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UnitState } from '../models/unit-state.model';

export const selectUnit = createFeatureSelector<UnitState>('units');

export const selectUnitList = createSelector(
  selectUnit,
  (state: UnitState) => state.unitList
);

export const selectFilteredUnitList = createSelector(
  selectUnit,
  (state: UnitState) =>
    state.unitList
      .filter((unit) => {
        if (state.selectedCosts.length > 0) {
          if (unit.cost) {
            const unitCosts = Object.keys(unit.cost).map((key) => ({
              material: key,
              value: unit?.cost?.[key as keyof typeof unit.cost] || 0,
            }));
            const unitCostsSelected = unitCosts.filter((unitCost) =>
              state.selectedCosts.some(
                (selectedCost) =>
                  selectedCost.material === unitCost.material &&
                  selectedCost.value <= unitCost.value
              )
            );
            if (unitCostsSelected.length !== state.selectedCosts.length) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      })
      .filter((unit) => {
        if (state.selectedAge !== 'All' && unit.age !== state.selectedAge) {
          return false;
        }
        return true;
      })
);

export const selectSelectedAge = createSelector(
  selectUnit,
  (state: UnitState) => state.selectedAge
);

export const selectSelectedCosts = createSelector(
  selectUnit,
  (state: UnitState) => state.selectedCosts
);

export const selectSelectedUnit = createSelector(
  selectUnit,
  (state: UnitState) => state.selectedUnit
);
