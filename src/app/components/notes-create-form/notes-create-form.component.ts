import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'notes-notes-create-form',
  templateUrl: './notes-create-form.component.html',
  styleUrls: ['./notes-create-form.component.scss']
})
export class NotesCreateFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotesCreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note) {}

  ngOnInit(): void {
  }
  
  submit(){
    this.dialogRef.close();
  }

}
