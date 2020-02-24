import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NotesCreateFormComponent} from './components/notes-create-form/notes-create-form.component';
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  profileImg;

  constructor(public dialog: MatDialog,
    private authService:AuthService,
    private noteService:NotesService,
    private dataService:DataService) {}

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

  reloadAllNotes(){
    this.noteService.GetUserNotes().subscribe(res => {
      this.dataService.updateUserNotes(res);
    });
  }

  logout(){
      this.authService.logout();
  }
  
}


