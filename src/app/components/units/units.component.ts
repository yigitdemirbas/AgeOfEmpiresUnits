import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cost } from 'src/app/models/cost.model';
import { SelectedCost } from 'src/app/models/selected-cost.model';
import { Unit } from 'src/app/models/unit.model';
import { UnitService } from 'src/app/services/unit.service';
import { UnitActions, UnitApiActions } from 'src/app/state/units.action';
import {
  selectFilteredUnitList,
  selectSelectedAge,
  selectSelectedCosts,
} from 'src/app/state/units.selector';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
})
export class UnitsComponent implements OnInit, OnDestroy {
  constructor(
    private UnitService: UnitService,
    private store: Store,
    private router: Router
  ) {}

  private serviceSubscription: Subscription = new Subscription();
  public units: Array<Unit> = [];
  public filteredUnits: Array<Unit> = [];

  public ages: Array<string> = ['All'];
  public selectedAge: string = 'All';

  public costs: Array<string> = [];
  public selectedCosts: Array<SelectedCost> = [];

  private filteredUnitsSubscription: Subscription = new Subscription();
  private selectedAgeSubscription: Subscription = new Subscription();
  private selectedCostsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.serviceSubscription = this.UnitService.getUnits().subscribe(
      (units) => {
        this.store.dispatch(UnitApiActions.retrievedUnitList({ units }));
        this.store.dispatch(
          UnitActions.filteredUnitList({ filteredUnits: units })
        );
        this.units = units;
        this.units.forEach((unit) => {
          if (!this.ages.includes(unit.age)) {
            this.ages.push(unit.age);
          }
          if (!unit.cost) return;
          Object.keys(unit.cost).forEach((key) => {
            if (!this.costs.includes(key)) {
              this.costs.push(key);
            }
          });
        });
      }
    );
    this.filteredUnitsSubscription = this.store
      .select(selectFilteredUnitList)
      .subscribe((units) => {
        this.filteredUnits = units;
      });
    this.selectedAgeSubscription = this.store
      .select(selectSelectedAge)
      .subscribe((age) => {
        this.selectedAge = age;
      });
    this.selectedCostsSubscription = this.store
      .select(selectSelectedCosts)
      .subscribe((costs) => {
        this.selectedCosts = costs;
      });
  }

  selectAge(age: string): void {
    this.store.dispatch(UnitActions.selectAge({ age }));
  }

  getCosts(cost?: Cost): string {
    if (!cost) return '';
    let costs: Array<string> = [];
    Object.keys(cost).forEach((key) => {
      costs.push(`${key}: ${cost[key as keyof typeof cost]}`);
    });
    return costs.join(', ');
  }

  getCostValue(cost: string): number {
    const selectedCost = this.selectedCosts.find(
      (c) => c.material === cost
    ) as SelectedCost;
    return selectedCost ? selectedCost.value : 0;
  }

  onCheckboxChange(cost: any): void {
    this.store.dispatch(
      UnitActions.selectCosts({
        cost: {
          material: cost,
          value: 0,
        },
      })
    );
  }

  onRangeChange(e: Event, cost: any): void {
    const value = (<HTMLInputElement>e.target).value;
    this.store.dispatch(
      UnitActions.selectCostValue({
        cost: {
          material: cost,
          value: parseInt(value),
        },
      })
    );
  }

  isRangeDisabled(cost: string): boolean {
    return !this.selectedCosts.some((c) => c.material === cost);
  }

  onDetailClick(unit: Unit): void {
    this.store.dispatch(UnitActions.selectUnit({ unit }));
    this.router.navigate(['/unit-detail', unit.id]);
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
    this.filteredUnitsSubscription.unsubscribe();
    this.selectedAgeSubscription.unsubscribe();
    this.selectedCostsSubscription.unsubscribe();
  }
}
