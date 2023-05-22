import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { UnitDetailComponent } from './unit-detail.component';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;
  let mockStore: Partial<Store>;

  const mockSelectedUnit = {
    id: 14,
    name: 'Halberdier',
    description: 'Upgraded Pikeman',
    expansion: 'The Conquerors',
    age: 'Imperial',
    cost: {
      Food: 35,
      Wood: 25,
    },
    build_time: 22,
    reload_time: 3,
    movement_rate: 1,
    line_of_sight: 4,
    hit_points: 60,
    attack: 6,
    armor: '0/0',
    attack_bonus: [
      '+1 eagles',
      '+1 buildings',
      '+60 war elephants',
      '+32 cavalry',
      '+16 camels/ships',
    ],
  };

  beforeEach(async () => {
    mockStore = {
      select: () => of(null),
      dispatch: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UnitDetailComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to units if selectedUnit is null', () => {
    spyOn(component['router'], 'navigate');

    component.ngOnInit();

    expect(component['router'].navigate).toHaveBeenCalledWith(['/units']);
  });

  it('should populate selectedUnit and costs arrays on ngOnInit', () => {
    const mockSelectedUnitSubject = new BehaviorSubject(mockSelectedUnit);

    spyOn(component['store'], 'select').and.returnValue(
      mockSelectedUnitSubject.asObservable()
    );

    component.ngOnInit();

    expect(component.selectedUnit).toEqual(mockSelectedUnit);
  });
});
