import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private notesSource = new BehaviorSubject<Note[]>(new Array<Note>());
  notes = this.notesSource.asObservable();
  updateUserNotes(notes: Note[]) {
    this.notesSource.next(notes)
  }
  /* private notes: Note[];
  setNotes(notes:Note[]){
    this.notes = notes;
  }
  
  getNotes():Note[]{
    return this.notes;
  } */

  constructor() { }
}
