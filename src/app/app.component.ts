import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NotesCreateFormComponent} from './components/notes-create-form/notes-create-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-notes-ui';
  constructor(public dialog: MatDialog) {}

  showCreateNoteDialog() {
    const dialogRef = this.dialog.open(NotesCreateFormComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  
}


