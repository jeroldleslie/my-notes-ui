import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note } from 'src/app/model/note';
import { FormBuilder,FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'notes-notes-create-form',
  templateUrl: './notes-create-form.component.html',
  styleUrls: ['./notes-create-form.component.scss']
})
export class NotesCreateFormComponent implements OnInit {
  @ViewChild('title') titleElement: ElementRef;
  @ViewChild('content') contentElement: ElementRef;
  addNoteForm;
  loading=false;
  title = new FormControl('', []);
  content = new FormControl('', []);
  constructor(
    private dataService:DataService,
    private notesService:NotesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NotesCreateFormComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: Note) {
      this.addNoteForm = this.formBuilder.group({
        title: this.title,
        content: this.content,
      });
    }

  ngOnInit(): void {
    //this.title.nativeElement.className = null;

  }
  
  onSubmit(){
    if (this.addNoteForm.valid) {
      this.loading = true;
      this.notesService.CreateNote(this.addNoteForm.value).subscribe(res => {
        this.loading = false;
        console.log(res);

        this.notesService.GetUserNotes().subscribe(res => {
          this.dataService.updateUserNotes(res);
        });

        //this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
        //this.loginForm.reset();
      });
    }
    this.dialogRef.close();
  }

}
