import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/model/note';
import { DialogData } from '../notes-card-view/notes-card-view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'notes-notes-main-view',
  templateUrl: './notes-main-view.component.html',
  styleUrls: ['./notes-main-view.component.scss']
})
export class NotesMainViewComponent implements OnInit {

  note: Note
  constructor(
    public dialogRef: MatDialogRef<NotesMainViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.note = data.note
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
