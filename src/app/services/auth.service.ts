import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginResponse, User } from '../model/auth';
import { Router } from '@angular/router';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private router:Router,
    private dataService:DataService) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Ping
  Ping(): Observable<any> {
    return this.http.get<any>(environment.backendApiUrl + '/api/ping')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Signin
  Signin(data): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.backendApiUrl  + '/api/signin', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  
  // Signup
  Signup(data): Observable<User> {
    return this.http.post<User>(environment.backendApiUrl  + '/api/signup', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
 
  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.dataService.updateToolbarVisibility(false);
    this.router.navigate(['/login']);
  }

  // Error handling
  errorHandl(error) {
    
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
