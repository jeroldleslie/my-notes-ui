import { Component, OnInit, NgZone } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { Note } from 'src/app/model/note';
enum Priorities {
  Critical = "CRITICAL",
  High = "HIGH",
  Normal = "NORMAL",
  Low = "LOW",
  None = "NONE"
}


@Component({
  selector: 'notes-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  breakpoint = 3;

  notes: Note[];
  selectedValue : String[] = ["NONE"]
  toggleOptions: Array<Priorities> = [Priorities.Critical, Priorities.High,Priorities.Normal,Priorities.Low,Priorities.None];


  constructor(private noteService: NotesService,
    private dataService: DataService,
    private zone:NgZone) { }

  ngOnInit() {
    this.setCols();
    /* this.notes = this.dataService.getNotes();
    this.notesService.GetUserNotes().subscribe(res => {
      this.dataService.setNotes(res);
    }); */
    this.dataService.notes.subscribe(notes => {
      this.zone.run(()=> { // <== added
        this.notes = notes;
        });
      
    });

    this.noteService.GetUserNotes().subscribe(res => {
      this.dataService.updateUserNotes(res);
    });
  }

  onResize(event) {
    this.setCols();
  }

  setCols() {
    if (window.innerWidth <= 400) {
      this.breakpoint = 1
    }
    if (window.innerWidth >= 700 && window.innerWidth <= 800) {
      this.breakpoint = 2
    }
    if (window.innerWidth >= 800) {
      this.breakpoint = 3
    }
  }


  selectionChanged(item) {
    console.log("Selected value: " + item.value);

    this.noteService.Search("", item.value).subscribe(res => {
      this.dataService.updateUserNotes(res);
    });
    //this.selectedValue.forEach(i => console.log(`Included Item: ${i}`));
  }

}
