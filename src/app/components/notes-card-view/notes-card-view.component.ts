import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Note } from 'src/app/model/note';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReminderComponent } from '../reminder/reminder.component';
import { NotesMainViewComponent } from '../notes-main-view/notes-main-view.component';
export interface DialogData {
  note: Note;
}

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

  constructor(
    public dialog: MatDialog,
    private notesService: NotesService,
    private dataService: DataService,
    private formBuilder: FormBuilder) {
    this.uploadForm = this.formBuilder.group({
      image: [''],
      note_id: ['']
    });
  }

  ngOnInit(): void { }

  delete() {
    this.notesService.DeleteNote(this.note.id).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }

  openFile() {
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
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('image').value);
    formData.append('note_id', this.note.id.toString());

    this.notesService.ImageUpload(formData).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }

  showReminderDialog() {
    const dialogRef = this.dialog.open(ReminderComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handle(fileInput) {
    this.fileData = <File>fileInput.target.files[0];
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('note_id', this.note.id.toString());
    this.notesService.ImageUpload(formData).subscribe(res => {
      this.notesService.GetUserNotes().subscribe(res => {
        this.dataService.updateUserNotes(res);
      });
    });
  }

  setBGColor(color) {
    this.note.color = color;
    this.notesService.UpdateNote(this.note).subscribe(res => { });
  }

  showNote(note: Note) {
    //alert(note.id);
    const dialogRef = this.dialog.open(NotesMainViewComponent, {
      maxWidth: '500px',
      maxHeight: '600px',
      data: { note: this.note}
    });
  }
}
