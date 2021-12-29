import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from '../employee.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  searchText;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees()
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }
  
  add(
    department_id: number,
    first_name: string,
    last_name: string): void {
    department_id = department_id;
    first_name = first_name;
    last_name = last_name;
    if (!department_id || !first_name || !last_name) { return; }
    this.employeeService.addEmployee({ department_id, first_name, last_name} as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}
