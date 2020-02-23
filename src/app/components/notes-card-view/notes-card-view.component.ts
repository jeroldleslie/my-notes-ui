import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/model/note';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'notes-card-view',
  templateUrl: './notes-card-view.component.html',
  styleUrls: ['./notes-card-view.component.scss']
})
export class NotesCardViewComponent implements OnInit {

  @Input() note:Note;

  constructor(private notesService:NotesService,private dataService:DataService) { }

  ngOnInit(): void {
  }

  delete(){
    this.notesService.DeleteNote(this.note.id).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }
}
