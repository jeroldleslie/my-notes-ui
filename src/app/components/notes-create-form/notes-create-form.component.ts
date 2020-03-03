import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { NotesService } from 'src/app/services/notes.service';
import { DataService } from 'src/app/services/data.service';

enum Priorities {
  Critical = "CRITICAL",
  High = "HIGH",
  Normal = "NORMAL",
  Low = "LOW",
  None = "NONE"
}

@Component({
  selector: 'notes-notes-create-form',
  templateUrl: './notes-create-form.component.html',
  styleUrls: ['./notes-create-form.component.scss']
})
export class NotesCreateFormComponent implements OnInit {
  @ViewChild('title') titleElement: ElementRef;
  @ViewChild('content') contentElement: ElementRef;
  addNoteForm;
  loading = false;
  title = new FormControl('', []);
  content = new FormControl('', []);
  critical = Priorities.Critical;
  high = Priorities.High;
  normal = Priorities.Normal;
  low = Priorities.Low;
  none = Priorities.None;
  priorityControl = new FormControl(Priorities.None);
  constructor(
    private dataService: DataService,
    private notesService: NotesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NotesCreateFormComponent>) {
    this.addNoteForm = this.formBuilder.group({
      title: this.title,
      content: this.content,
      priority: this.priorityControl
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addNoteForm.valid) {
      this.loading = true;
      this.notesService.CreateNote(this.addNoteForm.value).subscribe(res => {
        this.loading = false;
        console.log(res);

        this.notesService.GetUserNotes().subscribe(res => {
          this.dataService.updateUserNotes(res);
        });
      });
    }
    this.dialogRef.close();
  }

}
