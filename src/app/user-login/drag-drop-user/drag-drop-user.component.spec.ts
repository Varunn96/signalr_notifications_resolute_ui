import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropUserComponent } from './drag-drop-user.component';

describe('DragDropUserComponent', () => {
  let component: DragDropUserComponent;
  let fixture: ComponentFixture<DragDropUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
