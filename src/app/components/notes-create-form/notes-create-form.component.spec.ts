import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreateFormComponent } from './notes-create-form.component';

describe('NotesCreateFormComponent', () => {
  let component: NotesCreateFormComponent;
  let fixture: ComponentFixture<NotesCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
