import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private notesSource = new BehaviorSubject<Note[]>(new Array<Note>());
  notes = this.notesSource.asObservable();

  private toolBarSubject = new BehaviorSubject<boolean>(false);
  showToolbar = this.toolBarSubject.asObservable();



  updateUserNotes(notes: Note[]) {
    for(let note of notes) {
      if (note.image_id){
        note.image_url = environment.backendApiUrl + "/api/notes/file/" + note.image_id +"?random+\=" + Math.random();
      }
    }
   
    this.notesSource.next(notes)
  }


  updateToolbarVisibility(show:boolean) {
    this.toolBarSubject.next(show)
  }


  constructor() { }
}
