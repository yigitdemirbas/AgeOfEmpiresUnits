import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Unit } from '../models/unit.model';
import { UnitResponse } from '../models/unit-response.model';
// import * as data from '../../assets/data/units.json';

const API_URL = 'http://private-2482d8-ageofempiresunits.apiary-mock.com/';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private http: HttpClient) {}

  getUnits(): Observable<Array<Unit>> {
    return this.http
      .get<UnitResponse>(`${API_URL}getUnits`)
      .pipe(map((data) => data.units));
    // return of(data.default.units);
  }
}
