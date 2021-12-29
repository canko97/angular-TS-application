import { Component, OnInit, Input } from '@angular/core';
import {Department} from '../departments/department';
import {Employee} from '../employees/employee';
import {EmployeeService} from '../employee.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentService } from '../department.service';
@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {

  @Input() department: Department;
  departments: Department[] = [];
  buildingDepartments: Department[] = [];
  // @Input() id:number
  employees: Employee[] = [];
  employeesOfDepartment: Employee[] = [];
  employeesOfBuilding: Employee[] = [];

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location,
    private departmentService: DepartmentService) { }


  ngOnInit(): void{
    this.getEmployees();
    this.getDepartment();
    this.getDepartments();
  }

  getEmployees(): void{
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  getDepartment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.departmentService.getDepartment(id)
      .subscribe(department => this.department = department);
  }

  getDepartments(): void{
    this.departmentService.getDepartments()
    .subscribe(departments => this.departments = departments);
  }

  getEmployeesOfDepartment(): Employee[]{
    this.employeesOfDepartment = [];
    for(var i=0;i<this.employees.length; i++){
        if(this.employees[i].department_id === this.department.id){
        this.employeesOfDepartment.push(this.employees[i])
      }
    }
    return this.employeesOfDepartment;
  }

  getBuildingDepartments(): void{
    this.buildingDepartments =[];
    this.employeesOfBuilding = []
     for(var i=0;i<this.departments.length; i++){

      if(this.departments[i].building === this.department.building)
      {
        this.buildingDepartments.push(this.departments[i])
      }
    }
    for(var i=0; i<this.buildingDepartments.length; i++){
      this.employees.forEach(employee => {
        if(employee.department_id === this.buildingDepartments[i].id){
          this.employeesOfBuilding.push(employee)
        }
      });
    }
  }

  getEmployeesOfBuilding():Employee[]{
    return this.employeesOfBuilding;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.departmentService.updateDepartment(this.department)
      .subscribe(() => this.goBack());
  }

  // addEmployees():void{
  //   this.department.employees.push(this.id)
  // }

  

}
