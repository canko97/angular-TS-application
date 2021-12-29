import { Injectable } from '@angular/core';
import { Department } from './departments/department';
// import {DEPARTMENTS} from './departments/departments-constructor';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private departmentsUrl = 'http://i875395.hera.fhict.nl/api/3616908'

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getDepartments(): Observable<Department[]> {
    const url = `${this.departmentsUrl}/department`;
    return this.http.get<Department[]>(url)
    .pipe(
      catchError(this.handleError<Department[]>('getDepartments', []))
    );
  }

  getDepartment(id: number): Observable<Department> {
    const url = `${this.departmentsUrl}/department?id=${id}`;
    return this.http.get<Department>(url).pipe(
      catchError(this.handleError<Department>(`getDepartment id=${id}`))
    );
  }

  updateDepartment (department: Department): Observable<any> {
    const id = typeof department === 'number' ? department : department.id;
    const url = `${this.departmentsUrl}/department?id=${id}`;
    return this.http.put(url, department, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateDepartment'))
    );
  }

  addDepartment (department: Department): Observable<Department> {
    const url = `${this.departmentsUrl}/department`;
    return this.http.post<Department>(url, department, this.httpOptions).pipe(
      catchError(this.handleError<Department>('addEmployee'))
    );
  }

  deleteDepartment (department: Department | number): Observable<Department> {
    const id = typeof department === 'number' ? department : department.id;
    const url = `${this.departmentsUrl}/department?id=${id}`;
  
    return this.http.delete<Department>(url, this.httpOptions).pipe(
      catchError(this.handleError<Department>('deleteDepartment'))
    );
  }

  /* GET whichever department's name contains search term */
  searchDepartments(term: string): Observable<Department[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Department[]>(`${this.departmentsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Department[]>('searchDepartments', []))
    );
  }

  
 
}
