import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCardViewComponent } from './notes-card-view.component';

describe('NotesCardViewComponent', () => {
  let component: NotesCardViewComponent;
  let fixture: ComponentFixture<NotesCardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
