import { Component, OnInit } from '@angular/core';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../department.service';
import {Department} from '../departments/department';
// import {DEPARTMENTS} from '../departments/departments-constructor'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  departments: Department[] = [];

  constructor(private employeeService: EmployeeService,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getEmployees();
    this.getDepartments();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  getDepartments(): void {
    this.departmentService.getDepartments()
      .subscribe(departments => this.departments = departments);
  }

  selectedDepartment: Department;

  // departments = DEPARTMENTS;

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }
  

}