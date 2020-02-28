import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesMainViewComponent } from './notes-main-view.component';

describe('NotesMainViewComponent', () => {
  let component: NotesMainViewComponent;
  let fixture: ComponentFixture<NotesMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
