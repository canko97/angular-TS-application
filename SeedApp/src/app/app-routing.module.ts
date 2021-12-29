import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeeDetailComponent }  from './employee-detail/employee-detail.component';
import { DepartmentDetailComponent }  from './department-detail/department-detail.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent },
  { path: 'ddetail/:id', component: DepartmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
