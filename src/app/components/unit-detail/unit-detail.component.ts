import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SelectedCost } from 'src/app/models/selected-cost.model';
import { Unit } from 'src/app/models/unit.model';
import { selectSelectedUnit } from 'src/app/state/units.selector';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss'],
})
export class UnitDetailComponent implements OnInit, OnDestroy {
  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  // public id: any = null;
  public selectedUnit: Unit | null = null;
  public costs: Array<SelectedCost> = [];
  private unitSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('unitId'); // This is the old way of doing it
    this.unitSubscription = this.store
      .select(selectSelectedUnit)
      .subscribe((unit) => {
        if (!unit) {
          this.router.navigate(['/units']);
          return;
        }
        this.selectedUnit = unit;
        if (unit.cost) {
          this.costs = Object.keys(unit.cost).map((key) => ({
            material: key,
            value: unit?.cost?.[key as keyof typeof unit.cost] || 0,
          }));
        }
      });
  }

  ngOnDestroy(): void {
    this.unitSubscription.unsubscribe();
  }
}
