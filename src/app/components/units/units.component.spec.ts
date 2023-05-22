import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UnitsComponent } from './units.component';
import { Unit } from 'src/app/models/unit.model';

describe('UnitsComponent', () => {
  let component: UnitsComponent;
  let fixture: ComponentFixture<UnitsComponent>;
  let mockStore: Partial<Store>;

  const mockUnits: Array<Unit> = [
    {
      id: 1,
      name: 'Archer',
      description:
        'Quick and light. Weak at close range; excels at battle from distance',
      expansion: 'Age of Kings',
      age: 'Feudal',
      cost: {
        Wood: 25,
        Gold: 45,
      },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: '0/0',
      accuracy: '80%',
    },
    {
      id: 2,
      name: 'Crossbowman',
      description: 'Upgraded archer',
      expansion: 'Age of Kings',
      age: 'Castle',
      cost: {
        Wood: 25,
        Gold: 45,
      },
      build_time: 27,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 7,
      hit_points: 35,
      range: 5,
      attack: 5,
      armor: '0/0',
      attack_bonus: ['+3 spearmen'],
      accuracy: '85%',
    },
    {
      id: 3,
      name: 'Arbalest',
      description: 'Upgraded crossbowman',
      expansion: 'Age of Kings',
      age: 'Imperial',
      cost: {
        Wood: 25,
        Gold: 45,
      },
      build_time: 27,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 7,
      hit_points: 40,
      range: 5,
      attack: 6,
      armor: '0/0',
      attack_bonus: ['+3 spearmen'],
      accuracy: '90%',
    },
    {
      id: 4,
      name: 'Cavalry Archer',
      description: 'Fast with ranged attack. Ideal for hit-and-run attacks',
      expansion: 'Age of Kings',
      age: 'Castle',
      cost: {
        Wood: 40,
        Gold: 70,
      },
      build_time: 34,
      reload_time: 2,
      attack_delay: 1,
      movement_rate: 1.4,
      line_of_sight: 5,
      hit_points: 50,
      range: 4,
      attack: 6,
      armor: '0/0',
      attack_bonus: ['+2 spearmen'],
      search_radius: 6,
      accuracy: '50%',
    },
    {
      id: 5,
      name: 'Heavy Cavalry Archer',
      description: 'Upgraded Cavalry Archer',
      expansion: 'Age of Kings',
      age: 'Imperial',
      cost: {
        Wood: 40,
        Gold: 70,
      },
      build_time: 27,
      reload_time: 2,
      attack_delay: 1,
      movement_rate: 1.4,
      line_of_sight: 6,
      hit_points: 60,
      range: 4,
      attack: 7,
      armor: '1/0',
      attack_bonus: ['+2 spearmen'],
      accuracy: '50%',
    },
    {
      id: 6,
      name: 'Hand Cannoneer',
      description:
        'Powerful close attack; inaccurate at range. Attack bonus against spearman +11 in total',
      expansion: 'Age of Kings',
      age: 'Imperial',
      cost: {
        Food: 45,
        Gold: 50,
      },
      build_time: 34,
      reload_time: 3.45,
      attack_delay: 0.45,
      movement_rate: 0.96,
      line_of_sight: 9,
      hit_points: 35,
      range: 7,
      attack: 17,
      armor: '1/0',
      attack_bonus: ['1 spearmen', '+10 infantry', '+2 rams'],
      accuracy: '65%',
    },
    {
      id: 7,
      name: 'Skirmisher',
      description: 'Ranged unit equipped with armor vs. archer attacks',
      expansion: 'Age of Kings',
      age: 'Feudal',
      cost: {
        Food: 25,
        Wood: 35,
      },
      build_time: 22,
      reload_time: 3,
      attack_delay: 0.5,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 30,
      range: '1-4',
      attack: 2,
      armor: '0/3',
      attack_bonus: [
        '+3 spearmen',
        '+3 archers/hand cannon/skirms/conquistadors',
      ],
      accuracy: '90%',
    },
    {
      id: 8,
      name: 'Elite Skirmisher',
      description: 'Upgraded skirmisher',
      expansion: 'Age of Kings',
      age: 'Castle',
      cost: {
        Food: 25,
        Wood: 35,
      },
      build_time: 22,
      reload_time: 3,
      attack_delay: 0.5,
      movement_rate: 0.96,
      line_of_sight: 7,
      hit_points: 35,
      range: '1-5',
      attack: 3,
      armor: '0/4',
      attack_bonus: [
        '+3 spearmen',
        '+4 archers/hand cannon/skirms/conquistadors',
        '+6 against cavalry archers',
      ],
      accuracy: '90%',
    },
    {
      id: 9,
      name: 'Eagle Warrior',
      description:
        'Fast infantry with extensive sight; resists conversion; attack bonus vs. Monks',
      expansion: 'The Conquerors',
      age: 'Dark',
      cost: null,
      reload_time: 2,
      movement_rate: 1.1,
      line_of_sight: 6,
      hit_points: 50,
      attack: 4,
      armor: '0/2',
      attack_bonus: ['+8 monks', '+3 siege'],
    },
    {
      id: 10,
      name: 'Eagle Warrior',
      description:
        'Fast infantry with extensive sight; resists conversion; attack bonus vs. Monks',
      expansion: 'The Conquerors',
      age: 'Castle',
      cost: {
        Food: 20,
        Gold: 50,
      },
      build_time: 35,
      reload_time: 2,
      movement_rate: 1.1,
      line_of_sight: 6,
      hit_points: 50,
      attack: 7,
      armor: '0/2',
      attack_bonus: ['+8 monks', '+3 siege', '+2 cavalry', '+1 ship/camel'],
    },
  ];

  beforeEach(async () => {
    mockStore = {
      select: () => of([]),
      dispatch: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UnitsComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate units and ages arrays on ngOnInit', () => {
    spyOn(component['UnitService'], 'getUnits').and.returnValue(of(mockUnits));

    component.ngOnInit();

    expect(component.units).toEqual(mockUnits);
    expect(component.ages).toContain('All');
  });

  it('should select age and dispatch action on selectAge', () => {
    const age = 'All';

    spyOn(component['store'], 'dispatch');

    component.selectAge(age);

    expect(component.selectedAge).toBe(age);
    expect(component['store'].dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({
        type: 'SELECT_AGE',
        age: age,
      })
    );
  });

  it('should return costs string on getCosts', () => {
    const cost = {
      food: 100,
      gold: 200,
    };

    const result = component.getCosts(cost);

    expect(result).toBe('food: 100, gold: 200');
  });
});
