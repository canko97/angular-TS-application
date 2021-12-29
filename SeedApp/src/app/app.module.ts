import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    DepartmentDetailComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    DashboardComponent,
    EmployeeSearchComponent,
    DepartmentSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
