import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'notes-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private noteService: NotesService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  onEnterKey() {
    this.search();
  }
  search() {
    //alert(this.searchInput.nativeElement.value);
    var text = this.searchInput.nativeElement.value;
    this.noteService.Search(text.trim(), "").subscribe(res => {
      this.dataService.updateUserNotes(res);
    });
  }
}
