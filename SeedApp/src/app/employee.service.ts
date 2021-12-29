import { Injectable } from '@angular/core';
import { Employee } from './employees/employee';
//import { EMPLOYEES } from './employees/employees-constructor';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,) { }

  private employeesUrl = 'http://i875395.hera.fhict.nl/api/3616908';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmployees(): Observable<Employee[]>{
    const url = `${this.employeesUrl}/employee`;
    return this.http.get<Employee[]>(url).pipe(
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/employee?id=${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  updateEmployee (employee: Employee): Observable<any> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/employee?id=${id}`;
    return this.http.put(url, employee, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addEmployee (employee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/employee`;
    return this.http.post<Employee>(url, employee, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  deleteEmployee (employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/employee?id=${id}`;
  
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  searchEmployees (term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}/employee?first_name=${term}`).pipe(
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
    //return this.http.get<Employee[]>(`${this.employeesUrl}/?name=${term}`).pipe(
    //  catchError(this.handleError<Employee[]>('searchEmployees', []))
    //);
  }
  
}
