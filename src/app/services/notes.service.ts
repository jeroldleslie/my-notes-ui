import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Note } from '../model/note';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: Note[];



  constructor(private http: HttpClient) { }
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  removeFalsy(obj) {
    let newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };

  // Signin
  CreateNote(data): Observable<Note> {
    data.user_id = parseInt(localStorage.getItem('user_id'));
    return this.http.post<Note>(environment.backendApiUrl + '/api/notes', JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  GetUserNotes(): Observable<Note[]> {
    var url = environment.backendApiUrl + '/api/notes/user_notes/' + localStorage.getItem('user_id')
    //alert(url)
    return this.http.get<Note[]>(url)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  DeleteNote(id): Observable<any> {
    return this.http.delete<any>(environment.backendApiUrl + '/api/notes/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  UpdateNote(data): Observable<any> {
    data = this.removeFalsy(data);
    return this.http.put<Note>(environment.backendApiUrl + '/api/notes/' + data.id, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  ImageUpload(formData): Observable<any> {

    //window.alert(JSON.stringify(formData));
    return this.http.post<any>(environment.backendApiUrl + '/api/notes/file', formData)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }


  Search(text, priority): Observable<Note[]> {
    var url = environment.backendApiUrl + '/api/notes/search?text=' + text + '&priority=' + priority + '&user_id=' + localStorage.getItem('user_id')
    //alert(url)
    return this.http.get<Note[]>(url)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }

  // Error handling
  errorHandl(error) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    /* window.alert(errorMessage); */
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
