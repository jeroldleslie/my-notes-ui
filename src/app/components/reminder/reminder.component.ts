import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'notes-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  reminderForm;
  remindFromControl = new FormControl(new Date());
  remindUntilControl = new FormControl(new Date());

  minDate: Date;
  maxDate: Date;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReminderComponent>) {
    this.reminderForm = this.formBuilder.group({
      remindFrom: this.remindFromControl,
      remindUntil: this.remindUntilControl
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close();
  }

  setReminder() {
    this.dialogRef.close();
  }

  remindFromChange(e) {

  }
}
