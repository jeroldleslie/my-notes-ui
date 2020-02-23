import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'notes-card-view',
  templateUrl: './notes-card-view.component.html',
  styleUrls: ['./notes-card-view.component.scss']
})
export class NotesCardViewComponent implements OnInit {

  @Input() note:Note;

  constructor() { }

  ngOnInit(): void {
  }

}
