import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employees/employee';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employee = [
      {id:1, name: 'Cristi', dep: 'department1'},
      {id:2, name: 'Tsanko', dep: 'department1'},
      {id:3, name: 'Jason', dep: 'department3'}
    ];
    return {employee};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}