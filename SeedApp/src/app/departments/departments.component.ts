import { Component, OnInit, Input } from '@angular/core';
import {Department} from './department';
import {DepartmentService} from '../department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  // selectedDepartment: Department;
  departments: Department[];

  @Input() id:number = 0;
  @Input() name:string = "";
  @Input() description:string = "";
  


  // department: Department = {
  //   id: 37,
  //   name: 'rak',
  //   building: 'r1',
  //   employees: []
  // }



  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  // createDepartment(): void {
  //   this.department.id = this.id;
  //   this.department.name = this.name;
  //   this.department.description = this.description;

    
  //   this.departments.push(this.department)
  // }

  // deleteDepartment(name): void {
  //   for(var i=0; i<this.departments.length; i++){
  //     if(this.departments[i]["name"] == name){
  //       this.departments.splice(i, 1)
  //     }
  //   }
  // }

  getDepartments(): void{
    this.departmentService.getDepartments()
    .subscribe(departments => this.departments = departments);
  }

  add(
    // id: number,
    name: string,
    building: string): void {
    // id = id;
    name = name;
    building = building;
    if (!name || !building) { return; }
    this.departmentService.addDepartment({name, building} as Department)
      .subscribe(department => {
        this.departments.push(department);
      });
  }

  delete(department: Department): void {
    this.departments = this.departments.filter(e => e !== department);
    this.departmentService.deleteDepartment(department).subscribe();
  }

}
