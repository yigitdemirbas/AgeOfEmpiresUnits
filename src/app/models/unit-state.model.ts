import { SelectedCost } from './selected-cost.model';
import { Unit } from './unit.model';

export interface UnitState {
  unitList: ReadonlyArray<Unit>;
  filteredUnitList: ReadonlyArray<Unit>;
  selectedAge: string;
  selectedCosts: Array<SelectedCost>;
  selectedUnit: Unit | null;
}
