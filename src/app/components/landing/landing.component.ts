import { Component, OnInit } from '@angular/core';
import { Notes } from 'src/app/model/notes';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'notes-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  breakpoint = 3;

  notes: Notes[];
  /*  = [
    {
      title: 'Hello',
      content: 'sdfsdgf sdgsdfsdfhjsagf asjhfasbb kahfakj asjkfhasf asjasfha fkjasfhas aksjfhaskj sfkjsadhf askjfhasf sdfkjsdfhsa sdafajksfaskjf asfkjsafsf asfkjasbfas fjfh sajhfsdjhf sjhfsdjhf sdjhdfbds',
      priority: '',
      created_on: '',
      remind_from: '',
      remind_until: '',
      image: ''
    },
    {
      title: 'Hello Leslie',
      content: 'wieurtxnmbviuw aujryqiuwrbcs iquwyndsfbsu iuqwyrbvmnsdiuwe iquwyrbviuwe iuwfb',
      priority: '',
      created_on: '',
      remind_from: '',
      remind_until: '',
      image: ''
    },
    {
      title: 'Nice team',
      content: 'sdfjh iuehf weuyr sdjfb wuyerb',
      priority: '',
      created_on: '',
      remind_from: '',
      remind_until: '',
      image: ''
    }
  ] */
  constructor(private notesService: NotesService, private dataService:DataService) { }

  ngOnInit() {
    this.setCols();
    /* this.notes = this.dataService.getNotes();
    this.notesService.GetUserNotes().subscribe(res => {
      this.dataService.setNotes(res);
    }); */
    this.dataService.notes.subscribe(notes => this.notes = notes);
    
    this.notesService.GetUserNotes().subscribe(res => {
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

}
