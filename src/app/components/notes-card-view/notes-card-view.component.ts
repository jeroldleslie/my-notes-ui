import { Component, OnInit, Input,ElementRef,ViewChild } from '@angular/core';
import { Note } from 'src/app/model/note';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from '../../../environments/environment';
//import { SelectorMatcher } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'notes-card-view',
  templateUrl: './notes-card-view.component.html',
  styleUrls: ['./notes-card-view.component.scss']
})
export class NotesCardViewComponent implements OnInit {
  @ViewChild('fileInput') fileInputElement: ElementRef;
  fileData: File = null;
  uploadForm: FormGroup;
  @Input() note: Note;

  /* constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { } */

  constructor(private notesService: NotesService, private dataService: DataService,private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      image: [''],
      note_id: ['']
    });
   }

  ngOnInit(): void {
    //alert(JSON.stringify(this.note));
    //this.imageURL = environment.backendApiUrl + "/api/notes/file/" + this.note.id;
  }

  delete() {
    this.notesService.DeleteNote(this.note.id).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }

  openFile() {
    //alert(JSON.stringify(this.note));
    //document.querySelector('input').click()
    this.fileInputElement.nativeElement.click()
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
    this.onSubmit();
  }

  onSubmit() {
    //alert(">>>>>>"+this.note.id)
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('image').value);
    formData.append('note_id', this.note.id.toString());

    this.notesService.ImageUpload(formData).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }

  /* handle(e){
    console.log('Change input file')
  } */
  handle(fileInput) {
    //alert(JSON.stringify(this.note));
    /* alert(this.noteIDElement.nativeElement.value()); */
    this.fileData = <File>fileInput.target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('note_id', this.note.id.toString());
    //window.alert(this.note.id);
    this.notesService.ImageUpload(formData).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
    //this.preview();
  }

}
